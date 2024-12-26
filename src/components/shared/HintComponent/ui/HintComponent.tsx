import styles from './hintComponent.module.css'

export const HintComponent = ({ text }: { text: string }) => {
    return (
        <span className={styles.hint}>{text}</span>
    )
}