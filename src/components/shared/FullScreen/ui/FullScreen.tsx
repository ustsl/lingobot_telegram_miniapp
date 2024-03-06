import styles from './fullScreen.module.css';

export const FullScreen = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.fs}>
            {children}
        </div>
    )
}