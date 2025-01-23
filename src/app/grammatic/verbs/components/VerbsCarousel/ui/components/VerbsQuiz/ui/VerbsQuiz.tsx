import styles from './verbsQuiz.module.css'

import React, { useState, useEffect } from "react";
import { Verb } from "../../../verbsCarousel.props";
import { ButtonComponent } from "@/components/shared/ButtonComponent";
import { InputElement } from "@/components/shared/InputElement";
import { CardAnimationWrapper } from "@/components/shared/CardAnimationWrapper";
import { CardWrapper } from "@/components/shared/CardWrapper";
import { PersonKey, PolarityKey, TenseKey } from "./sentenceListTrainer.props";
import { TaskMessage } from "./components/TaskMessage";
import { TitleComponent } from "./components/TitleBlock";
import { GridBlock } from "@/components/shared/GridBlock";
import { getRandomPersonKey, getRandomPolarityKey, getRandomTenseKey } from "./functions";
import { WrongAnswerBlock } from "@/components/shared/WrongAnswerBlock";


interface VerbsQuizProps {
    verbsList: Verb[];
    setIsFinish: React.Dispatch<React.SetStateAction<boolean>>;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
}



export const VerbsQuiz: React.FC<VerbsQuizProps> = ({
    verbsList,
    setIsFinish,
    setLimit,
}) => {
    // Локальное состояние очереди глаголов.
    // Будем копировать verbsList, чтобы не менять изначальный массив.
    const [queue, setQueue] = useState<Verb[]>(verbsList);
    // Текущий индекс / или текущий глагол
    const [currentVerb, setCurrentVerb] = useState<Verb | null>(null);

    // Поля, которые мы просим у пользователя (напр. "present_continuous" "negative" "3sg").
    const [currentTense, setCurrentTense] = useState<TenseKey | null>(null);
    const [currentPolarity, setCurrentPolarity] = useState<PolarityKey | null>(null);
    const [currentPerson, setCurrentPerson] = useState<PersonKey | null>(null);

    // Сюда сохраняем ответ пользователя.
    const [userAnswer, setUserAnswer] = useState("");

    // Состояние, чтобы отобразить, была ли проверка, и правильный/неправильный ответ
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");

    // При загрузке компонента делаем копию входного массива и стартуем "квиз".
    useEffect(() => {
        if (verbsList.length > 0) {
            // Создаём очередь из копии массива
            setQueue([...verbsList]);
        }
    }, [verbsList]);

    // Когда очередь обновляется, если там есть элементы, берём первый,
    // генерируем для него рандомную форму (tense + polarity + person).
    useEffect(() => {
        if (queue.length === 0) {
            setIsFinish(true)
            return;
        }

        // Берём первый глагол и генерируем задание
        const verb = queue[0];
        setCurrentVerb(verb);

        const randomTense = getRandomTenseKey();
        const randomPolarity = getRandomPolarityKey();
        const randomPerson = getRandomPersonKey();

        setCurrentTense(randomTense);
        setCurrentPolarity(randomPolarity);
        setCurrentPerson(randomPerson);

        // Вычислим правильный ответ на текущий шаг
        const correct = verb[randomTense][randomPolarity][randomPerson];
        setCorrectAnswer(correct);

        // Сбрасываем состояние ответа
        setUserAnswer("");
        setIsChecked(false);
        setIsCorrect(false);
    }, [queue, setIsFinish]);


    // Проверка ответа
    const handleCheckAnswer = () => {
        if (!currentVerb || !currentTense || !currentPolarity || !currentPerson) {
            return;
        }

        // Если пользователь ответил ровно так же, как в "correctAnswer"
        if (userAnswer.trim() === correctAnswer) {
            setIsCorrect(true);
            setIsChecked(true);
            // Уменьшаем лимит шагов
            setLimit((prev) => {
                const newVal = prev - 1;
                if (newVal <= 0) {
                    setIsFinish(true);
                }
                return newVal;
            });

            // Удаляем глагол из начала очереди
            setQueue((prevQueue) => {
                const newQueue = [...prevQueue];
                newQueue.shift(); // удаляем первый элемент
                return newQueue;
            });
        } else {
            setIsCorrect(false);
            setIsChecked(true);
        }


    };

    // Если ответ неправильный и нажимаем "Продолжить", то:
    // 1) Глагол перемещается в конец очереди
    // 2) Сбрасываем состояние ответа
    const handleContinueAfterWrong = () => {
        if (!currentVerb) return;

        setQueue((prevQueue) => {
            // Снимаем первый глагол
            const [wrongVerb, ...rest] = prevQueue;
            // Ставим в конец
            return [...rest, wrongVerb];
        });
        // userAnswer сбрасываем в useEffect при переходе к новому глаголу
    };

    if (!currentVerb || !currentTense || !currentPolarity || !currentPerson) {
        return null; // Или спиннер
    }


    const keyUniq = currentVerb.infinitive

    return (

        <CardAnimationWrapper keyUniq={keyUniq}>
            <CardWrapper>

                <div className={styles.block}>

                    <GridBlock gridSize='S'>

                        <TitleComponent
                            word={currentVerb.infinitive}
                            ru={currentVerb.ru}
                            transcription={currentVerb.transcription} />
                        <TaskMessage
                            currentTense={currentTense}
                            currentPolarity={currentPolarity}
                            currentPerson={currentPerson} />
                    </GridBlock>

                    <GridBlock gridSize="XS">
                        {!isChecked && (
                            <>
                                <InputElement
                                    handler={(e) => setUserAnswer(e.target.value)}
                                    label={"Введите ответ"}
                                    value={userAnswer} />
                                <ButtonComponent onClick={handleCheckAnswer} text="Проверить ответ" size="S" />
                            </>
                        )}
                        {isChecked && !isCorrect && (
                            <>
                                <WrongAnswerBlock header="Допущена ошибка" content={`Правильный ответ: ${correctAnswer}`} />
                                <ButtonComponent onClick={handleContinueAfterWrong} text="К следующей задаче" size="S" />
                            </>
                        )}
                    </GridBlock>
                </div>
            </CardWrapper>
        </CardAnimationWrapper>

    );
};
