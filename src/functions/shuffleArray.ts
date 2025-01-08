export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]; // Создаем копию массива, чтобы не изменять оригинал
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Случайный индекс от 0 до i
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Меняем элементы местами
    }
    return shuffled;
}
