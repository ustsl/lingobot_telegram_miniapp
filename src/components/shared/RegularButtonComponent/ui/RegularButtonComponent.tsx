import styles from './regularButtonComponent.module.css'

export const RegularButtonComponent = ({ text, onClick }: { text: string, onClick: () => void }) => {
    return (
        <button onClick={onClick} className={styles.button}>{text}</button>
    )
}