export interface ProtocolProduct {
  name: string
  price: string
  step: number
  url?: string
}

export interface ProtocolEmailPayload {
  email: string
  firstName?: string
  marketingConsent: boolean
  protocol: {
    skinType: string
    concerns: string[]
    products: ProtocolProduct[]
    totalPrice: string
  }
}

const ENDPOINT = import.meta.env.VITE_PROTOCOL_EMAIL_ENDPOINT as string | undefined

function stubSubmit(payload: ProtocolEmailPayload): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.info("[Protocol Email] Stub submit — set VITE_PROTOCOL_EMAIL_ENDPOINT to send for real", payload)
      resolve()
    }, 800)
  })
}

async function readApiError(res: Response): Promise<string> {
  const text = await res.text().catch(() => "")
  try {
    const json = JSON.parse(text) as { error?: string }
    if (json?.error) return json.error
  } catch {
    /* not JSON */
  }
  return text || "Could not send your protocol. Please try again."
}

export async function submitProtocolEmail(payload: ProtocolEmailPayload): Promise<void> {
  if (!ENDPOINT) {
    return stubSubmit(payload)
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(await readApiError(res))
  }
}
