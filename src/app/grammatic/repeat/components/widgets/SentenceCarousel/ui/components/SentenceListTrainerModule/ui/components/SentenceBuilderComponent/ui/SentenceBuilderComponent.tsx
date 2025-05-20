import { useEffect, useState } from "react";
import styles from "./sentenceBuilderComponent.module.css";
import { HintComponent } from "@/components/shared/HintComponent";
import { GridBlock } from "@/components/shared/GridBlock";
import { ButtonComponent } from "@/components/shared/ButtonComponent";

import { shuffleArray } from "@/functions/shuffleArray";

interface Props {
    sentence: string;
    handleNext: () => void;
    handleSkip: () => void;
}

export const SentenceBuilderComponent: React.FC<Props> = ({
    sentence,
    handleNext,
    handleSkip,
}) => {
    // Очищенные слова (без точек, запятых и в нижнем регистре)
    const [initialWords, setInitialWords] = useState<string[]>([]);
    // Слова, которые ещё не использованы (перемешанный массив)
    const [remainingWords, setRemainingWords] = useState<string[]>([]);
    // Слова, которые пользователь уже набрал
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    // Флаги состояния
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // При первом рендере или при изменении sentence
    useEffect(() => {
        const cleaned = sentence
            .trim()
            .split(/\s+/)
            .map((w) => w.replace(/[.,!?]/g, "").toLowerCase());

        setInitialWords(cleaned);
        setRemainingWords(shuffleArray([...cleaned]));
        setSelectedWords([]);
        setIsError(false);
        setIsSuccess(false);
    }, [sentence]);

    // Авто-переход при успехе через 1.5 секунды
    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                handleNext();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, handleNext]);

    // Перемещение слова между списками
    const handleWordClick = (word: string, fromSelected: boolean) => {
        if (isSuccess || isError) return; // блокируем клики после проверки

        if (fromSelected) {
            setSelectedWords((prev) => prev.filter((w) => w !== word));
            setRemainingWords((prev) => [...prev, word]);
        } else {
            setRemainingWords((prev) => prev.filter((w) => w !== word));
            setSelectedWords((prev) => [...prev, word]);
        }
    };

    // Проверка собранного предложения
    const handleCheck = () => {
        const userSentence = selectedWords.join(" ");
        const correctSentence = initialWords.join(" ");
        if (userSentence === correctSentence) {
            setIsSuccess(true);
        } else {
            setIsError(true);
        }
    };

    return (
        <div className={styles.block}>
            <GridBlock gridSize="S">
                {/* Блок доступных слов */}
                {!isError && !isSuccess && (
                    <GridBlock gridSize="XS">
                        <HintComponent text="Соберите предложение из слов" />
                        <div className={styles.wordsContainer}>
                            {remainingWords.map((word) => (
                                <span
                                    key={word}
                                    className={styles.word}
                                    onClick={() => handleWordClick(word, false)}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    </GridBlock>
                )}

                {/* Результат, ошибка или успех */}
                <GridBlock gridSize="XS">
                    {isError ? (
                        <>
                            <HintComponent text="Правильный вариант:" />
                            <p>{sentence}</p>
                        </>
                    ) : isSuccess ? (
                        <>
                            <HintComponent text="Верно 👍" />
                            <p >{initialWords.join(" ")}</p>
                        </>
                    ) : selectedWords.length > 0 ? (
                        <>
                            <HintComponent text="Ваш результат:" />
                            <div className={styles.wordsContainer}>
                                {selectedWords.map((word) => (
                                    <span
                                        key={word}
                                        className={styles.word}
                                        onClick={() => handleWordClick(word, true)}
                                    >
                                        {word}
                                    </span>
                                ))}
                            </div>
                        </>
                    ) : null}
                </GridBlock>
            </GridBlock>

            {/* Кнопки */}
            {!isSuccess && (
                <>
                    {isError ? (
                        <ButtonComponent onClick={handleSkip} text="Дальше" size="S" />
                    ) : (
                        <ButtonComponent onClick={handleCheck} text="Проверить" size="S" />
                    )}
                </>
            )}
        </div>
    );
};
