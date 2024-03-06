import styles from './wordNameComponent.module.css';

export const WordNameComponent = ({ word }: { word: string }) => {
    return (
        <div className={styles.word}>{word}</div>
    )
}