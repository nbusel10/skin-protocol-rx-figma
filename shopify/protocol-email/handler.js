/**
 * Protocol email backend (Phase 2).
 *
 * POST JSON:
 *   { email, firstName?, marketingConsent, protocol: { skinType, concerns, products, totalPrice } }
 *
 * Env (server-side only — never prefix with VITE_):
 *   SHOPIFY_STORE_DOMAIN           your-store.myshopify.com
 *   SHOPIFY_CLIENT_ID              Dev Dashboard Client ID
 *   SHOPIFY_CLIENT_SECRET          Dev Dashboard Client secret
 *   RESEND_API_KEY                 re_...
 *   PROTOCOL_EMAIL_FROM            Skin Protocol Rx <hello@yourdomain.com>
 *   SHOP_URL                       https://skinprotocolrx.com
 *   SHOP_PUBLIC_DOMAIN             skinprotocolrx.com
 *   ALLOWED_ORIGINS                extra CORS origins, comma-separated
 *
 * Optional legacy fallback (old custom apps):
 *   SHOPIFY_ADMIN_ACCESS_TOKEN     shpat_...
 *
 * Shopify Email / Flow cannot send this protocol to people who skipped
 * marketing opt-in. This handler sends a transactional email via Resend,
 * then stores the customer + protocol JSON on Shopify.
 */

const API_VERSION = "2026-07"
const METAFIELD_NAMESPACE = "custom"
const METAFIELD_KEY = "protocol_quiz"
const CUSTOMER_TAG = "protocol-quiz"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_BODY_BYTES = 50_000

/** @type {{ token: string, expiresAt: number } | null} */
let cachedAdminToken = null

export class ProtocolEmailError extends Error {
  /**
   * @param {string} message
   * @param {number} [status]
   */
  constructor(message, status = 500) {
    super(message)
    this.name = "ProtocolEmailError"
    this.status = status
  }
}

/**
 * @param {Request} request
 * @param {Record<string, string | undefined>} env
 * @returns {Promise<Response>}
 */
export async function handleProtocolEmailRequest(request, env = {}) {
  const config = readEnv(env)
  const origin = request.headers.get("Origin") || ""
  const cors = corsHeaders(origin, config)

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, cors)
  }

  try {
    const payload = await parsePayload(request)
    assertConfigured(config)

    const customer = await upsertShopifyCustomer(config, payload)
    await Promise.all([
      saveProtocolMetafield(config, customer.id, payload),
      tagCustomer(config, customer.id),
      payload.marketingConsent ? subscribeCustomer(config, customer.id) : Promise.resolve(),
    ])
    await sendProtocolEmail(config, payload)

    return json({ ok: true }, 200, cors)
  } catch (err) {
    const status = err instanceof ProtocolEmailError ? err.status : 500
    const message =
      err instanceof ProtocolEmailError
        ? err.message
        : "Could not send your protocol. Please try again."
    if (status === 500) console.error("[protocol-email]", err)
    return json({ error: message }, status, cors)
  }
}

function readEnv(runtime = {}) {
  const fromProcess = typeof process !== "undefined" && process.env ? process.env : {}
  const get = (key) => runtime[key] || fromProcess[key] || ""

  const shopDomain = get("SHOPIFY_STORE_DOMAIN").replace(/^https?:\/\//, "").replace(/\/$/, "")
  const extraOrigins = get("ALLOWED_ORIGINS")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return {
    shopDomain,
    adminToken: get("SHOPIFY_ADMIN_ACCESS_TOKEN") || get("SHOPIFY_ADMIN_TOKEN"),
    clientId: get("SHOPIFY_CLIENT_ID") || get("SHOPIFY_API_KEY"),
    clientSecret: get("SHOPIFY_CLIENT_SECRET") || get("SHOPIFY_API_SECRET"),
    resendKey: get("RESEND_API_KEY"),
    emailFrom: get("PROTOCOL_EMAIL_FROM") || get("RESEND_FROM"),
    shopUrl: (get("SHOP_URL") || (shopDomain ? `https://${shopDomain}` : "https://skinprotocolrx.com")).replace(
      /\/$/,
      "",
    ),
    publicDomain: get("SHOP_PUBLIC_DOMAIN") || "skinprotocolrx.com",
    extraOrigins,
  }
}

function assertConfigured(config) {
  const missing = []
  if (!config.shopDomain) missing.push("SHOPIFY_STORE_DOMAIN")
  const hasStaticToken = Boolean(config.adminToken)
  const hasClientCreds = Boolean(config.clientId && config.clientSecret)
  if (!hasStaticToken && !hasClientCreds) {
    missing.push("SHOPIFY_CLIENT_ID + SHOPIFY_CLIENT_SECRET")
  }
  if (!config.resendKey) missing.push("RESEND_API_KEY")
  if (!config.emailFrom) missing.push("PROTOCOL_EMAIL_FROM")
  if (missing.length) {
    throw new ProtocolEmailError(`Protocol email is not configured (${missing.join(", ")}).`, 503)
  }
}

/**
 * Dev Dashboard apps use short-lived tokens via client credentials.
 * Legacy custom apps can still pass a static Admin API token.
 * @param {ReturnType<typeof readEnv>} config
 */
async function getAdminAccessToken(config) {
  if (config.adminToken) return config.adminToken

  const now = Date.now()
  if (cachedAdminToken && cachedAdminToken.expiresAt > now + 60_000) {
    return cachedAdminToken.token
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: config.clientId,
    client_secret: config.clientSecret,
  })

  const res = await fetch(`https://${config.shopDomain}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body,
  })

  const jsonBody = await res.json().catch(() => null)
  if (!res.ok || !jsonBody?.access_token) {
    console.error("[protocol-email] token exchange", res.status, jsonBody)
    throw new ProtocolEmailError(
      "Shopify authentication failed. Confirm the app is installed on this store and Client ID/Secret are correct.",
      502,
    )
  }

  const expiresInSec = Number(jsonBody.expires_in) || 24 * 60 * 60
  cachedAdminToken = {
    token: jsonBody.access_token,
    expiresAt: now + expiresInSec * 1000,
  }
  return cachedAdminToken.token
}

function corsHeaders(origin, config) {
  const allowed = allowedOrigins(config)
  const allowOrigin = !origin || allowed.includes(origin) || allowed.includes("*") ? origin || "*" : allowed[0]
  return {
    "Access-Control-Allow-Origin": allowOrigin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  }
}

function allowedOrigins(config) {
  const origins = new Set([
    "https://skinprotocolrx.com",
    "https://www.skinprotocolrx.com",
    "http://localhost:8443",
    "http://127.0.0.1:8443",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    ...config.extraOrigins,
  ])
  if (config.publicDomain) {
    origins.add(`https://${config.publicDomain}`)
    origins.add(`https://www.${config.publicDomain}`)
  }
  if (config.shopDomain) origins.add(`https://${config.shopDomain}`)
  return [...origins]
}

async function parsePayload(request) {
  const length = Number(request.headers.get("Content-Length") || "0")
  if (length > MAX_BODY_BYTES) {
    throw new ProtocolEmailError("Request is too large.", 413)
  }

  let body
  try {
    body = await request.json()
  } catch {
    throw new ProtocolEmailError("Invalid JSON body.", 400)
  }

  const email = String(body?.email || "")
    .trim()
    .toLowerCase()
  if (!EMAIL_RE.test(email) || email.length > 254) {
    throw new ProtocolEmailError("Please enter a valid email address.", 400)
  }

  const firstName = String(body?.firstName || "").trim().slice(0, 80)
  const marketingConsent = Boolean(body?.marketingConsent)
  const protocol = body?.protocol || {}
  const skinType = String(protocol.skinType || protocol.skinType || "").trim().slice(0, 80)
  const totalPrice = String(protocol.totalPrice || protocol.totalPrice || "").trim().slice(0, 40)
  const concerns = Array.isArray(protocol.concerns)
    ? protocol.concerns.map((c) => String(c).trim()).filter(Boolean).slice(0, 12)
    : []
  const products = Array.isArray(protocol.products)
    ? protocol.products
        .slice(0, 16)
        .map((p, i) => {
          const step = Number(p?.step || p?.step)
          return {
            name: String(p?.name || "").trim().slice(0, 120),
            price: String(p?.price || "").trim().slice(0, 40),
            step: step > 0 ? step : i + 1,
            url: typeof p?.url === "string" && p.url.startsWith("http") ? p.url.slice(0, 500) : undefined,
          }
        })
        .filter((p) => p.name)
    : []

  if (!products.length) {
    throw new ProtocolEmailError("Protocol is missing products.", 400)
  }

  return {
    email,
    firstName: firstName || undefined,
    marketingConsent,
    protocol: { skinType, concerns, products, totalPrice },
  }
}

async function upsertShopifyCustomer(config, payload) {
  const input = { email: payload.email }
  if (payload.firstName) input.firstName = payload.firstName

  const data = await shopifyGraphql(
    config,
    `mutation UpsertCustomer($identifier: CustomerSetIdentifiers, $input: CustomerSetInput!) {
      customerSet(identifier: $identifier, input: $input) {
        customer { id }
        userErrors { field message }
      }
    }`,
    { identifier: { email: payload.email }, input },
  )

  throwIfUserErrors(data.customerSet?.userErrors, "Could not save your profile.")
  const customer = data.customerSet?.customer
  if (!customer?.id) throw new ProtocolEmailError("Could not save your profile.", 502)
  return customer
}

async function saveProtocolMetafield(config, ownerId, payload) {
  const value = JSON.stringify({
    skinType: payload.protocol.skinType,
    concerns: payload.protocol.concerns,
    products: payload.protocol.products,
    totalPrice: payload.protocol.totalPrice,
    firstName: payload.firstName || "",
    marketingConsent: payload.marketingConsent,
    quizDate: new Date().toISOString(),
    source: "protocol-quiz",
  })

  const metafields = [
    {
      ownerId,
      namespace: METAFIELD_NAMESPACE,
      key: METAFIELD_KEY,
      type: "json",
      value,
    },
  ]

  const data = await shopifyGraphql(
    config,
    `mutation SetProtocol($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { id }
        userErrors { field message code }
      }
    }`,
    { metafields },
  )

  const errors = data.metafieldsSet?.userErrors || []
  if (errors.length && errors.some((e) => /definition/i.test(`${e.message || ""} ${e.code || ""}`))) {
    await ensureMetafieldDefinition(config)
    const retry = await shopifyGraphql(
      config,
      `mutation SetProtocol($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields { id }
          userErrors { field message }
        }
      }`,
      { metafields },
    )
    throwIfUserErrors(retry.metafieldsSet?.userErrors, "Could not save your protocol.")
    return
  }

  throwIfUserErrors(errors, "Could not save your protocol.")
}

async function ensureMetafieldDefinition(config) {
  const data = await shopifyGraphql(
    config,
    `mutation DefineProtocol($definition: MetafieldDefinitionInput!) {
      metafieldDefinitionCreate(definition: $definition) {
        createdDefinition { id }
        userErrors { field message }
      }
    }`,
    {
      definition: {
        name: "Protocol Quiz",
        namespace: METAFIELD_NAMESPACE,
        key: METAFIELD_KEY,
        description: "Latest Email My Protocol quiz results",
        type: "json",
        ownerType: "CUSTOMER",
      },
    },
  )
  const errors = data.metafieldDefinitionCreate?.userErrors || []
  const alreadyExists = errors.some((e) => /already exists|taken/i.test(e.message || ""))
  if (errors.length && !alreadyExists) {
    console.error("[protocol-email] metafield definition", errors)
  }
}

async function tagCustomer(config, id) {
  const data = await shopifyGraphql(
    config,
    `mutation TagCustomer($id: ID!, $tags: [String!]!) {
      tagsAdd(id: $id, tags: $tags) {
        userErrors { message }
      }
    }`,
    { id, tags: [CUSTOMER_TAG] },
  )
  throwIfUserErrors(data.tagsAdd?.userErrors, "Could not tag customer.")
}

async function subscribeCustomer(config, customerId) {
  const data = await shopifyGraphql(
    config,
    `mutation SubscribeCustomer($input: CustomerEmailMarketingConsentUpdateInput!) {
      customerEmailMarketingConsentUpdate(input: $input) {
        userErrors { field message }
      }
    }`,
    {
      input: {
        customerId,
        emailMarketingConsent: {
          marketingState: "SUBSCRIBED",
          marketingOptInLevel: "SINGLE_OPT_IN",
          consentUpdatedAt: new Date().toISOString(),
        },
      },
    },
  )
  throwIfUserErrors(data.customerEmailMarketingConsentUpdate?.userErrors, "Could not update email preferences.")
}

async function shopifyGraphql(config, query, variables) {
  const accessToken = await getAdminAccessToken(config)
  const res = await fetch(`https://${config.shopDomain}/admin/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({ query, variables }),
  })

  const jsonBody = await res.json().catch(() => null)
  if (!res.ok) {
    console.error("[protocol-email] Shopify HTTP", res.status, jsonBody)
    throw new ProtocolEmailError(
      res.status === 401 || res.status === 403
        ? "Shopify authentication failed."
        : "Shopify is unavailable. Please try again.",
      502,
    )
  }
  if (jsonBody?.errors?.length) {
    console.error("[protocol-email] GraphQL", jsonBody.errors)
    throw new ProtocolEmailError("Could not update Shopify. Please try again.", 502)
  }
  return jsonBody.data
}

function throwIfUserErrors(errors, fallback) {
  if (!errors?.length) return
  console.error("[protocol-email] userErrors", errors)
  throw new ProtocolEmailError(fallback, 502)
}

async function sendProtocolEmail(config, payload) {
  const html = renderProtocolEmail(payload, config.shopUrl)
  const subject = payload.firstName
    ? `${payload.firstName}, your Skin Protocol is ready`
    : "Your Skin Protocol is ready"

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.emailFrom,
      to: [payload.email],
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    console.error("[protocol-email] Resend", res.status, detail)
    throw new ProtocolEmailError("Could not send your protocol email. Please try again.", 502)
  }
}

function renderProtocolEmail(payload, shopUrl) {
  const name = payload.firstName ? escapeHtml(payload.firstName) : "there"
  const skinType = payload.protocol.skinType ? escapeHtml(payload.protocol.skinType) : "your skin"
  const concerns = payload.protocol.concerns.map(escapeHtml).join(", ")
  const rows = payload.protocol.products
    .map((p) => {
      const step = `<span style="display:inline-block;min-width:18px;color:#BD705F;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;">${escapeHtml(String(p.step))}</span>`
      const title = p.url
        ? `<a href="${escapeHtml(p.url)}" style="color:#252525;text-decoration:none;font-weight:500;">${escapeHtml(p.name)}</a>`
        : `<span style="color:#252525;font-weight:500;">${escapeHtml(p.name)}</span>`
      return `<tr>
        <td style="padding:14px 0;border-bottom:1px solid #EEECE5;">${step} ${title}</td>
        <td style="padding:14px 0;border-bottom:1px solid #EEECE5;text-align:right;color:#252525;white-space:nowrap;">${escapeHtml(p.price)}</td>
      </tr>`
    })
    .join("")
  const total = payload.protocol.totalPrice ? escapeHtml(payload.protocol.totalPrice) : ""

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#F7F6F1;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#252525;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F7F6F1;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid #E8E8E8;">
        <tr><td style="padding:36px 36px 24px;border-bottom:1px solid #F6EBE8;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#BD705F;">Skin Protocol Rx</p>
          <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.25;font-weight:400;">Your protocol, ${name}.</h1>
        </td></tr>
        <tr><td style="padding:28px 36px;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#444;">Built around <strong>${skinType}</strong>${concerns ? ` and ${concerns}` : ""}. A clear routine — nothing extra.</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table>
          ${total ? `<p style="margin:20px 0 0;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#888;">Protocol total <span style="color:#252525;letter-spacing:0;">${total}</span></p>` : ""}
          <p style="margin:28px 0 0;">
            <a href="${escapeHtml(shopUrl)}" style="display:inline-block;background:#BD705F;color:#ffffff;text-decoration:none;padding:14px 22px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">Shop your protocol</a>
          </p>
        </td></tr>
        <tr><td style="padding:20px 36px 32px;font-size:12px;line-height:1.6;color:#999;">
          This email is your personal routine — not a marketing blast. ${payload.marketingConsent ? "You're also opted in for tips, new releases, and offers; unsubscribe anytime." : "We didn't add you to marketing."}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...cors,
      "Content-Type": "application/json; charset=utf-8",
    },
  })
}
