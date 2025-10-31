import styles from './pointName.module.css'

export const PointName = ({ text, icon }: { text: string, icon?: React.ReactNode }) => {
    return (
        <h2 className={styles.pointName}>{icon && <span className={styles.icon}>{icon}</span>}{text}</h2>
    )
}