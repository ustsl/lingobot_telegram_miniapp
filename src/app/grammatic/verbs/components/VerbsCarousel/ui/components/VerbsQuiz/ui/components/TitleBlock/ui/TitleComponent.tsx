import { GridBlock } from '@/components/shared/GridBlock'
import styles from './titleComponent.module.css'

export const TitleComponent = ({ word, ru, transcription }: { word: string, ru: string, transcription: string }) => {
    return (
        <GridBlock gridSize='XS'>
            <span className={styles.title}>{word}</span>
            <div className={styles.details}>
                <span>{ru}</span>
                <span className={styles.transcription}>[{transcription}]</span>
            </div>
        </GridBlock>
    )
}