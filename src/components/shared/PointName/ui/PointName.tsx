import styles from './pointName.module.css'

export const PointName = ({ text }: { text: string }) => {
    return (
        <h2 className={styles.pointName}>{text}</h2>
    )
}