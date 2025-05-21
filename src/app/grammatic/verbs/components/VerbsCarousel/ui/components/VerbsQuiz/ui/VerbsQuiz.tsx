import React, { useState, useEffect } from "react";
import styles from './verbsQuiz.module.css';

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
import { HintComponent } from "@/components/shared/HintComponent"; // импортируем HintComponent

import { PersonKey, PolarityKey, TenseKey } from './verbsQuiz.props';
import rules from './rules.json';
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
    setPercentExperience,
    userId
}) => {
    const [queue, setQueue] = useState<Verb[]>([]);
    const [currentVerb, setCurrentVerb] = useState<Verb | null>(null);
    const [currentTense, setCurrentTense] = useState<TenseKey | null>(null);
    const [currentPolarity, setCurrentPolarity] = useState<PolarityKey | null>(null);
    const [currentPerson, setCurrentPerson] = useState<PersonKey | null>(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");

    // Загрузка очереди
    useEffect(() => {
        if (verbsList.length) setQueue([...verbsList]);
    }, [verbsList]);

    // При изменении queue — готовим новую задачу
    useEffect(() => {
        if (!queue.length) return;
        const verb = queue[0];
        setCurrentVerb(verb);

        const tense = getRandomTenseKey();
        const polarity = getRandomPolarityKey();
        const person = getRandomPersonKey();
        setCurrentTense(tense);
        setCurrentPolarity(polarity);
        setCurrentPerson(person);

        const correct = verb[tense][polarity][person];
        setCorrectAnswer(correct);

        setUserAnswer("");
        setIsChecked(false);
        setIsCorrect(false);
    }, [queue, setIsFinish]);

    // Авто-переход при правильном ответе через 1.5 с
    useEffect(() => {
        if (isChecked && isCorrect) {
            const timer = setTimeout(() => {
                // уменьшаем лимит и проверяем окончание
                setLimit(prev => {
                    const next = prev - 1;
                    if (next <= 0) setIsFinish(true);
                    return next;
                });
                // уходим к следующему глаголу
                setQueue(prev => prev.slice(1));
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isChecked, isCorrect, setLimit, setIsFinish]);

    const handleCheckAnswer = async () => {
        if (!currentVerb || !currentTense || !currentPolarity || !currentPerson) return;
        const right = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();

        try {
            const { average } = await handleSaveStat(userId, right ? 1 : 0);
            setPercentExperience((average * 100).toFixed(1));
        } catch (e) {
            console.error('Error saving stat:', e);
        }

        setIsCorrect(right);
        setIsChecked(true);
    };

    const handleContinueAfterWrong = () => {
        if (!currentVerb) return;
        setQueue(prev => {
            const [first, ...rest] = prev;
            return [...rest, first];
        });
    };

    if (!currentVerb || !currentTense || !currentPolarity || !currentPerson) {
        return null;
    }

    const rule = rules[currentPerson][currentTense][currentPolarity];

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
                                    handler={e => setUserAnswer(e.target.value)}
                                    label="Введите ответ"
                                    value={userAnswer}
                                />
                                <ButtonComponent
                                    onClick={handleCheckAnswer}
                                    text="Проверить ответ"
                                    size="S"
                                />
                            </>
                        )}

                        {isChecked && isCorrect && (
                            <>
                                <HintComponent text="Верно 👍" />
                                <p>{correctAnswer}</p>
                            </>
                        )}

                        {isChecked && !isCorrect && (
                            <>
                                <RulesComponent rule={rule} />
                                <WrongAnswerBlock
                                    content={`Ваш ответ: ${userAnswer}<br/>Правильный ответ: ${correctAnswer}`}
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
