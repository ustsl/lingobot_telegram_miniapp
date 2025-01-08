import { useEffect, useState } from "react";
import styles from "./sentenceBuilderComponent.module.css";
import { HintComponent } from "@/components/shared/HintComponent";
import { GridBlock } from "@/components/shared/GridBlock";
import { ButtonComponent } from "@/app/train/components/shared/ButtonComponent";
import { RegularButtonComponent } from "@/components/shared/RegularButtonComponent";
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
    // Исходные слова
    const [initialWords, setInitialWords] = useState<string[]>([]);
    // Слова, которые ещё не использованы (перемешанный массив)
    const [remainingWords, setRemainingWords] = useState<string[]>([]);
    // Слова, которые пользователь уже набрал
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    // Результат проверки
    const [isError, setIsError] = useState(false);

    // ------------------------------
    // Перемешаем предложение один раз при первом рендере (или когда sentence меняется)
    useEffect(() => {
        const splitted = sentence.trim().split(" ");
        setInitialWords(splitted);
        setSelectedWords([]);

        // Перемешиваем массив
        const shuffled = shuffleArray([...splitted]);
        setRemainingWords(shuffled);
    }, [sentence]);

    // ------------------------------
    // Клик по слову в списке remainingWords:
    //   - переносим его в selectedWords
    // Клик по слову в списке selectedWords:
    //   - возвращаем обратно в remainingWords
    const handleWordClick = (word: string, fromSelected: boolean) => {
        if (fromSelected) {
            // Удаляем из selectedWords, возвращаем в remainingWords
            setSelectedWords((prev) => prev.filter((w) => w !== word));
            setRemainingWords((prev) => [...prev, word]);
        } else {
            // Удаляем из remainingWords, добавляем в selectedWords
            setRemainingWords((prev) => prev.filter((w) => w !== word));
            setSelectedWords((prev) => [...prev, word]);
        }
    };

    // ------------------------------
    // Нажатие на "Проверить"
    // Если собранная строка совпадает с исходной => handleNext()
    // иначе => handleSkip()
    const handleCheck = () => {
        const userSentence = selectedWords.join(" ");
        const correctSentence = initialWords.join(" ");

        if (userSentence === correctSentence) {
            handleNext();
        } else {
            setIsError(true)
        }
    };

    return (
        <div className={styles.block}>
            <GridBlock gridSize="S">
                {/* Блок слов, которые ещё не выбраны */}
                {!isError && <GridBlock gridSize="XS">
                    <HintComponent text="Соберите предложение из слов" />
                    <div className={styles.wordsContainer}>
                        {remainingWords.map((word) => (
                            <span
                                key={`rem-${word}-${Math.random()}`}
                                className={styles.word}
                                onClick={() => handleWordClick(word, false)}
                            >
                                {word}
                            </span>
                        ))}
                    </div>
                </GridBlock>}

                {/* Блок слов, которые пользователь уже выбрал (порядок клика) */}
                <GridBlock gridSize="XS">
                    {isError &&
                        <>
                            <HintComponent text="Правильный вариант:" />
                            <p>{sentence}</p>
                        </>
                    }

                    {!isError && selectedWords.length > 0 &&
                        <>
                            <HintComponent text="Результат:" />
                            <div className={styles.wordsContainer}>
                                {selectedWords.map((word) => (
                                    <span
                                        key={`sel-${word}-${Math.random()}`}
                                        className={styles.word}
                                        onClick={() => handleWordClick(word, true)}
                                    >
                                        {word}
                                    </span>
                                ))}
                            </div>
                        </>
                    }
                </GridBlock>
            </GridBlock>


            {isError && <ButtonComponent onClick={handleSkip} text="Дальше" size="S" />}
            {!isError && <ButtonComponent onClick={handleCheck} text="Проверить" size="S" />}


        </div>
    );
};

