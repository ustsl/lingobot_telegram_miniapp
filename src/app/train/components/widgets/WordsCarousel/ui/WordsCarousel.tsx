'use client'

import styles from './wordsCarousel.module.css';

import { postResponse } from "@/api/restAPI"
import { useBaseStore, useUserStore } from "@/store/useStore";
import { useState, useEffect } from 'react'
import { IWordEntry } from "./wordsCarousel.props";


import { WordComponent } from './components/WordComponent';

import { BackHomeLink } from '@/components/features/BackHomeLink';
import { sendProgress } from '@/functions/sendProgress';
import { HintComponent } from '@/components/shared/HintComponent';
import { shuffleArray } from '@/functions/shuffleArray';
import { ButtonComponent } from '@/components/shared/ButtonComponent';
import { ErrorComponent, SuccessComponent } from '@/components/features/StatusComponent';
import { CardAnimationWrapper } from '@/components/shared/CardAnimationWrapper';
import { FlexBlock } from '@/components/shared/FlexBlock';




export const WordsCarousel = ({ query, phase }: { query: string, phase: 'new' | 'repeat' }) => {
    const [isLoad, setIsLoad] = useState(false);
    const [step, setStep] = useState(0);
    const [uniqStep, setUniqStep] = useState(0)
    const [isActive, setIsActive] = useState(false);
    const [limit, setLimit] = useState(0)
    const [wordList, setWordList] = useState<any[]>([])
    const userId = useBaseStore((state: any) => state.userId)
    const trainType = useUserStore((state: any) => state.trainType)
    const [exceptions, setExceptions] = useState<any[]>([])

    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        console.log('trainUseEffect')
        if (userId) {
            handleGetUserData(userId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);




    useEffect(() => {
        setFadeOut(false);
    }, [wordList])



    function handleScrollWord(repeat: 0 | 1) {
        setStep(prevStep => prevStep + 1);
        setUniqStep(prevStep => prevStep + 1);

        setWordList(prevWordList => {
            if (prevWordList.length > 0) {
                const firstElement = prevWordList[0];
                sendProgress(userId, firstElement.word, 0, 0, repeat)
                const newWordList = [...prevWordList.slice(1), firstElement];
                return newWordList;
            }
            return prevWordList;
        });
    }

    function handleReplaceWord() {
        setUniqStep(prevStep => prevStep + 1);

        const updatedExceptions = new Set([...exceptions, wordList[0].pk]);

        const data = {
            method: '/word/get_new_word_one/',
            data: { user: userId, exception_word: Array.from(updatedExceptions).join(',') }
        };

        setExceptions(Array.from(updatedExceptions));

        postResponse(data).then((result: any) => {
            sendProgress(userId, wordList[0].word, 0, 1, 0)
            if (result && result?.word_list && result?.status && (result.word_list).length > 0) {
                const item = result.word_list[0]
                setWordList([item, ...wordList.slice(1)])
            } else {
                setWordList([...wordList.slice(1)])
            }
        })
    }

    function handleRememberWord(phase: 'new' | 'repeat') {
        setUniqStep(prevStep => prevStep + 1);

        let repeat: 0 | 1 = 0
        if (phase == 'repeat') {
            repeat = 1
        }
        sendProgress(userId, wordList[0].word, 1, 0, repeat);
        setWordList(prevWordList => [...prevWordList.slice(1)]);
    }

    function handleGetUserData(userId: number) {
        console.log('get-words')
        const data = {
            method: query,
            data: { user: userId }
        }
        postResponse(data).then((result: any) => {
            if (result) {
                if (result?.word_list && result?.status) {
                    setWordList(shuffleArray(result.word_list));
                    setLimit(result.limit)
                    setIsLoad(true);
                    if ((result.word_list).length > 0) {
                        setIsActive(true)
                    }
                }
            }
        })
    }

    let wordKey: keyof IWordEntry = 'word';
    let translateKey: keyof IWordEntry = 'ru';

    if (trainType === 'RU') {
        wordKey = 'ru'
        translateKey = 'word'
    }

    const item = wordList[0];

    return (
        <>
            <FlexBlock>

                {phase == 'new' && step < wordList.length ?
                    <HintComponent text={`Осталось добавить: ${wordList.length}`} />
                    :
                    <HintComponent text={`Осталось повторить: ${wordList.length}`} />
                }

                <BackHomeLink />
            </FlexBlock>


            {wordList.length > 0
                &&
                <CardAnimationWrapper keyUniq={uniqStep}>
                    <WordComponent item={item} wordKey={wordKey} translateKey={translateKey} />
                </CardAnimationWrapper>
            }

            {isLoad && wordList.length > 0 &&
                <div className={styles.buttons}>
                    {phase == 'new' && step < wordList.length ?
                        (
                            <>
                                <ButtonComponent
                                    onClick={() => handleRememberWord(phase)}
                                    text="Изучить" color="success" />
                                <ButtonComponent
                                    onClick={() => handleReplaceWord()}
                                    text="Уже знаю" />
                            </>
                        ) :
                        <>

                            <ButtonComponent
                                onClick={() => handleRememberWord(phase)}
                                text="Вспомнил" color="success" />
                            <ButtonComponent
                                onClick={() => handleScrollWord(1)}
                                text="Не вспомнил" />

                        </>
                    }
                </div>
            }
            {
                isActive && wordList.length == 0 &&
                <>
                    {phase === 'new' ?
                        <SuccessComponent
                            title={"Слова успешно добавлены"}
                            description={'И теперь доступны в режиме повтора'} />
                        :
                        <SuccessComponent
                            title={"Тренировка успешно завершена!"}
                            description={'Возвращайтесь к процессу завтра'} />}

                </>

            }

            {
                isLoad && !isActive && wordList.length == 0 &&
                <>
                    {limit === 0 ?
                        <ErrorComponent
                            text="Вами был исчерпан установленный суточный лимит слов. Измените настройки, или продолжите завтра." /> :
                        <>
                            {phase != 'repeat' ?
                                <ErrorComponent
                                    text="Кажется, вами были выучены все слова в выбранной категории. Добавьте новые категории." /> :
                                <ErrorComponent
                                    text="Не найдено слов для повторения. Сначала добавьте слова на изучение." />}
                        </>
                    }
                </>
            }
        </>
    )
}