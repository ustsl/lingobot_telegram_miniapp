'use client'

import styles from './wordsCarousel.module.css';

import { postResponse } from "@/api/restAPI"
import { useBaseStore, useUserStore } from "@/store/useStore";
import { useState, useEffect } from 'react'
import { IWordEntry } from "./wordsCarousel.props";
import { RevealButtonComponent } from "./components/RevealButtonComponent";
import { AudioComponent } from "./components/AudioComponent";
import { ExamplesComponent } from "./components/ExamplesComponent";
import { WordCounter } from "./components/WordCounter";
import { WordNameComponent } from "./components/WordNameComponent";
import { GridBlock } from '@/components/shared/GridBlock';
import { TranslateComponent } from './components/TranslateComponent';
import { FlexBlock } from '@/components/shared/FlexBlock';
import { Logo } from '@/components/shared/Logo';

export const WordsCarousel = () => {
    const [wordList, setWordList] = useState([])
    const userId = useBaseStore((state: any) => state.userId)
    const trainType = useUserStore((state: any) => state.trainType)
    const [isReveal, setIsReveal] = useState(false);


    function handleGetUserData(userId: number) {

        const data = {
            method: '/word/get_new_word_list/',
            data: { user: userId }
        }

        postResponse(data).then((result: any) => {
            if (result) {
                if (result?.word_list && result?.status) {
                    setWordList(result.word_list)
                }
            }
        })
    }

    useEffect(() => {
        console.log('trainUseEffect')
        if (userId) {
            handleGetUserData(userId)
        }
    }, [userId]);


    let wordKey: keyof IWordEntry = 'word';
    let translateKey: keyof IWordEntry = 'ru';

    if (trainType === 'RU') {
        wordKey = 'ru'
        translateKey = 'word'
    }


    const generateWord = () => {
        const item = wordList[0] as IWordEntry
        return (

            <div key={item.pk} className={styles.block}>
                <GridBlock gridSize='XS'>
                    <WordNameComponent word={item[wordKey] as string} />
                    <AudioComponent soundPath={item.sound} />
                </GridBlock>
                {isReveal ?
                    <div className={styles.details}>
                        <TranslateComponent word={item[translateKey] as string} transcription={item.transcription} />
                        {item.get_sentences && (item.get_sentences).length > 0 &&
                            <ExamplesComponent examples={item.get_sentences} />}
                    </div>
                    :
                    <RevealButtonComponent onClick={() => setIsReveal(true)} />

                }
            </div>)
    }

    return (
        <div>
            <div className={styles.flex}>
                <Logo />
                <WordCounter counter={wordList.length} />
            </div>
            {wordList.length > 0 && generateWord()}

        </div>
    )
}