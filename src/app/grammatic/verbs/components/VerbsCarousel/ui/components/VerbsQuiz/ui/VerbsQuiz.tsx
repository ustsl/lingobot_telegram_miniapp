import styles from './verbsQuiz.module.css';

import React, { useState, useEffect } from "react";
import { Verb } from "../../../verbsCarousel.props";
import { ButtonComponent } from "@/components/shared/ButtonComponent";
import { InputElement } from "@/components/shared/InputElement";
import { CardAnimationWrapper } from "@/components/shared/CardAnimationWrapper";
import { CardWrapper } from "@/components/shared/CardWrapper";

import { TaskMessage } from "./components/TaskMessage";
import { TitleComponent } from "./components/TitleBlock";
import { GridBlock } from "@/components/shared/GridBlock";
import { getRandomPersonKey, getRandomPolarityKey, getRandomTenseKey, handleSaveStat } from "./functions";
import { WrongAnswerBlock } from "@/components/shared/WrongAnswerBlock";
import { PersonKey, PolarityKey, TenseKey } from './verbsQuiz.props';

// Импортируем правила (предположим, что это export const grammarRules = {...})
import { grammarRules } from './rules'
import rules from './rules.json'
import { RulesComponent } from './components/RulesComponent';

interface VerbsQuizProps {
    verbsList: Verb[];
    setIsFinish: React.Dispatch<React.SetStateAction<boolean>>;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    setPercentExperience: React.Dispatch<React.SetStateAction<string>>;
    userId: number;
}

export const VerbsQuiz: React.FC<VerbsQuizProps> = ({
    verbsList,
    setIsFinish,
    setLimit,
    userId,
    setPercentExperience
}) => {
    const [queue, setQueue] = useState<Verb[]>([]);
    const [currentVerb, setCurrentVerb] = useState<Verb | null>(null);

    // Параметры текущего шага
    const [currentTense, setCurrentTense] = useState<TenseKey | null>(null);
    const [currentPolarity, setCurrentPolarity] = useState<PolarityKey | null>(null);
    const [currentPerson, setCurrentPerson] = useState<PersonKey | null>(null);

    // Ответ пользователя
    const [userAnswer, setUserAnswer] = useState("");

    // Состояния проверки
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");

    // Загружаем очередь при монтировании
    useEffect(() => {
        if (verbsList.length > 0) {
            setQueue([...verbsList]);
        }
    }, [verbsList]);

    // Когда обновляется очередь
    useEffect(() => {
        if (queue.length === 0) {
            return;
        }

        const verb = queue[0];
        setCurrentVerb(verb);

        const randomTense = getRandomTenseKey();
        const randomPolarity = getRandomPolarityKey();
        const randomPerson = getRandomPersonKey();

        setCurrentTense(randomTense);
        setCurrentPolarity(randomPolarity);
        setCurrentPerson(randomPerson);

        // Правильный ответ
        const correct = verb[randomTense][randomPolarity][randomPerson];
        setCorrectAnswer(correct);

        // Сброс проверки
        setUserAnswer("");
        setIsChecked(false);
        setIsCorrect(false);
    }, [queue, setIsFinish]);



    const handleCheckAnswer = async () => {
        if (!currentVerb || !currentTense || !currentPolarity || !currentPerson) return;

        // Проверяем правильность ответа
        const isRight = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();

        try {
            // Асинхронно получаем результат сохранения
            const experienceResult = await handleSaveStat(userId, isRight ? 1 : 0);
            const percentValue = experienceResult.average * 100 as number
            const pResult = percentValue.toFixed(1)
            setPercentExperience(pResult)

            // Дальнейшая логика
            if (isRight) {
                setIsCorrect(true);
                setIsChecked(true);

                setLimit((prev) => {
                    const newVal = prev - 1;
                    if (newVal <= 0) {
                        setIsFinish(true);
                    }
                    return newVal;
                });

                setQueue((prevQueue) => {
                    const newQueue = [...prevQueue];
                    newQueue.shift();
                    return newQueue;
                });
            } else {
                setIsCorrect(false);
                setIsChecked(true);
            }
        } catch (error) {
            console.error('Error saving stat:', error);
        }
    };


    const handleContinueAfterWrong = () => {
        if (!currentVerb) return;
        setQueue((prevQueue) => {
            const [wrongVerb, ...rest] = prevQueue;
            return [...rest, wrongVerb];
        });
    };

    if (!currentVerb || !currentTense || !currentPolarity || !currentPerson) {
        return null; // Здесь можно поставить спиннер или заглушку
    }

    // Собираем связанные правила (тенз, полярность, персона)
    // Если в словаре нет ключа, подставляем пустой массив
    const relatedRules = [
        ...(grammarRules[currentTense] || []),
        ...(grammarRules[currentPolarity] || []),
        ...(grammarRules[currentPerson] || []),
    ];

    const rule = rules[currentPerson][currentTense][currentPolarity]

    return (
        <CardAnimationWrapper keyUniq={currentVerb.infinitive}>
            <CardWrapper>
                <div className={styles.block}>

                    <GridBlock gridSize='S'>
                        <TitleComponent
                            word={currentVerb.infinitive}
                            ru={currentVerb.ru}
                            transcription={currentVerb.transcription}
                        />
                        <TaskMessage
                            currentTense={currentTense}
                            currentPolarity={currentPolarity}
                            currentPerson={currentPerson}
                        />
                    </GridBlock>

                    <GridBlock gridSize="XS">
                        {!isChecked && (
                            <>
                                <InputElement
                                    handler={(e) => setUserAnswer(e.target.value)}
                                    label={"Введите ответ"}
                                    value={userAnswer}
                                />
                                <ButtonComponent
                                    onClick={handleCheckAnswer}
                                    text="Проверить ответ"
                                    size="S"
                                />
                            </>
                        )}
                        {isChecked && !isCorrect && (
                            <>
                                <RulesComponent rule={rule} />
                                <WrongAnswerBlock
                                    content={`Ваш ответ: ${userAnswer}</br> Правильный ответ: ${correctAnswer}`}
                                />

                                <ButtonComponent
                                    onClick={handleContinueAfterWrong}
                                    text="К следующей задаче"
                                    size="S"
                                />
                            </>
                        )}
                    </GridBlock>
                </div>

            </CardWrapper>
        </CardAnimationWrapper>
    );
};
