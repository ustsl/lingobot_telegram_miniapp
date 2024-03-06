import styles from './translateComponent.module.css';

export const TranslateComponent = ({ word, transcription }: { word: string, transcription: string | null }) => {
    return (
        <div className={styles.block}>
            <span>{word}</span>
            {transcription && <span className={styles.transcription}>[::{transcription}::]</span>}
        </div>
    )
}