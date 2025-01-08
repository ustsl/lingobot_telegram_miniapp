import styles from './cardWrapper.module.css';

export const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.block}>
            {children}
        </div>
    )
}