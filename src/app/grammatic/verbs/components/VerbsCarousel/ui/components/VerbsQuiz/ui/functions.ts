import { PersonKey, PolarityKey, TenseKey } from "./verbsQuiz.props";


// Функция для генерации рандомного времени
export function getRandomTenseKey(): TenseKey {
    const tenses: TenseKey[] = [
        "present_continuous",
        "simple_past",
        "future",
    ];
    return tenses[Math.floor(Math.random() * tenses.length)];
}

// Функция для генерации рандомной формы (позитив/негатив)
export function getRandomPolarityKey(): PolarityKey {
    return Math.random() < 0.5 ? "positive" : "negative";
}

// Функция для генерации рандомного лица/числа
export function getRandomPersonKey(): PersonKey {
    const persons: PersonKey[] = [
        "1sg",
        "2sg",
        "3sg",
        "1pl",
        "2pl",
        "3pl",
    ];
    return persons[Math.floor(Math.random() * persons.length)];
}
