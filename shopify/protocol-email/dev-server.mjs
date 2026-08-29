import { createServer } from "node:http"
import { handleProtocolEmailRequest } from "./handler.js"

const PORT = Number(process.env.PROTOCOL_EMAIL_PORT || 8787)

createServer(async (req, res) => {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const body = Buffer.concat(chunks)

  const request = new Request(`http://127.0.0.1:${PORT}${req.url || "/"}`, {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : body,
  })

  const response = await handleProtocolEmailRequest(request, process.env)
  res.statusCode = response.status
  response.headers.forEach((value, key) => res.setHeader(key, value))
  res.end(Buffer.from(await response.arrayBuffer()))
}).listen(PORT, "127.0.0.1", () => {
  console.info(`Protocol email API listening on http://127.0.0.1:${PORT}`)
})
