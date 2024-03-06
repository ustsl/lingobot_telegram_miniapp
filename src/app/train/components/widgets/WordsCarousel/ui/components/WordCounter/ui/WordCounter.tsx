import styles from './wordCounter.module.css';

export const WordCounter = ({ counter }: { counter: number }) => {
    return (
        <div className={styles.progress}>Осталось слов: {counter}</div>
    )
}