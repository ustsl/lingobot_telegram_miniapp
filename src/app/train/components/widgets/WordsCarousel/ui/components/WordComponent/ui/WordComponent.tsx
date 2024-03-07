import styles from './wordComponent.module.css';

import { GridBlock } from "@/components/shared/GridBlock"
import { IWordEntry } from "../../../wordsCarousel.props"
import { WordNameComponent } from "../../WordNameComponent"
import { AudioComponent } from "../../AudioComponent"
import { TranslateComponent } from "../../TranslateComponent"
import { ExamplesComponent } from "../../ExamplesComponent"
import { RevealButtonComponent } from "../../RevealButtonComponent"
import { useEffect, useState } from 'react';



export const WordComponent = ({ item, wordKey, translateKey }: { item: IWordEntry, wordKey: keyof IWordEntry, translateKey: keyof IWordEntry }) => {
    const [isReveal, setIsReveal] = useState(false);
    const [animationKey, setAnimationKey] = useState(false);

    useEffect(() => {
        setIsReveal(false);
        setAnimationKey(prevKey => !prevKey);
    }, [item]);

    return (

        <div key={`${item.pk}-${animationKey}`} className={styles.block}>
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
        </div>
    )
}
