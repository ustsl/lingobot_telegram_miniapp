export const API_DOMAIN = "https://api.lingobot.ru"
export const API_VERSION: string = "/v1";
export const API_URL = API_DOMAIN + API_VERSION
export const TOKEN = process.env.API_SECRET_KEY
export const REVALIDATE_PARAM = 100

export const HEADERS = {
    'Authorization': TOKEN as string,
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
}