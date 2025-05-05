import { postResponse } from "@/api/restAPI"

export interface PaginatedResult<T> {
    results: T[]
    count: number
    next: string | null
}

/**
 * Универсальная функция для подгрузки “страниц” по API:
 * @param endpoint — базовый путь без query-параметров (например "/word_actions/get_user_list")
 * @param page — номер страницы
 * @param payload — тело запроса, сюда передаём userId, search и т.п.
 */
export async function paginatedFetch<T>(
    endpoint: string,
    page: number,
    payload: Record<string, any>,
): Promise<PaginatedResult<T>> {
    const link = `${endpoint}?page=${page}`
    const data = { method: link, data: payload }
    const res = await postResponse(data)
    return {
        results: res?.results || [],
        count: res?.count || 0,
        next: res?.next || null,
    }
}
