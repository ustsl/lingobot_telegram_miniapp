import styles from './baseMenuPoint.module.css';

export const BaseMenuButtonPoint = ({ onClick, text }: { onClick: () => void, text: string }) => {
    return (
        <button onClick={onClick} className={styles.link}>{text}</button>
    )
}

