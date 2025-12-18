import styles from './wordComponent.module.css';

import { GridBlock } from "@/components/shared/GridBlock"
import { IWordEntry } from "../../../wordsCarousel.props"
import { WordNameComponent } from "../../WordNameComponent"
import { AudioComponent } from "../../AudioComponent"
import { TranslateComponent } from "../../TranslateComponent"
import { ExamplesComponent } from "../../ExamplesComponent"
import { RevealButtonComponent } from "../../RevealButtonComponent"
import { useEffect, useState } from 'react';
import { CardWrapper } from '@/components/shared/CardWrapper';



export const WordComponent = ({ item, wordKey, translateKey }: { item: IWordEntry, wordKey: keyof IWordEntry, translateKey: keyof IWordEntry }) => {
    const [isReveal, setIsReveal] = useState(false);

    return (

        <CardWrapper>

            <WordNameComponent word={item[wordKey] as string} />
            {/* <AudioComponent soundPath={item.sound} /> */}

            {isReveal ?
                <div className={styles.details}>
                    <TranslateComponent word={item[translateKey] as string} transcription={item.transcription} />
                    {item.get_sentences && (item.get_sentences).length > 0 &&
                        <ExamplesComponent examples={item.get_sentences} />}
                </div>
                :
                <RevealButtonComponent onClick={() => setIsReveal(true)} />
            }
        </CardWrapper>
    )
}
