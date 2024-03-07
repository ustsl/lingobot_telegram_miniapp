import styles from './wordCounter.module.css';

export const WordCounter = ({ counter }: { counter: string }) => {
    return (
        <div className={styles.progress}> {counter}</div>
    )
}