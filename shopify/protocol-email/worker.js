import { handleProtocolEmailRequest } from "./handler.js"

export default {
  /**
   * @param {Request} request
   * @param {Record<string, string>} env
   */
  async fetch(request, env) {
    return handleProtocolEmailRequest(request, env)
  },
}
