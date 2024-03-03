import styles from './body.module.css';

export const BodyComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.body}>
            {children}
        </div>
    )
}