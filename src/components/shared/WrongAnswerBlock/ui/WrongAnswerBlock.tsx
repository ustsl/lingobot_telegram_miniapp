import styles from './wrongAnsweBlock.module.css'

export const WrongAnswerBlock = ({ content }: { content: string }) => {

    return (
        <div className={styles.error}>
            <span className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}