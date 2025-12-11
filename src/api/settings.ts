export const API_DOMAIN = "https://lingobot.qspk.me"
export const API_VERSION: string = "/v1";
export const API_URL = API_DOMAIN + API_VERSION
export const REVALIDATE_PARAM = 100

// NOTE: Do NOT export secrets (API keys / tokens) or headers that include them.
// The secret key is available server-side via process.env.API_SECRET_KEY and
// should only be used inside server routes or server-only modules.
