import styles from './wrongAnsweBlock.module.css'

export const WrongAnswerBlock = ({ header, content }: { header: string, content: string }) => {
    return (
        <div className={styles.error}>
            <span className={styles.header}>
                {header}
            </span>
            <span className={styles.content}>
                {content}
            </span>
        </div>
    )
}