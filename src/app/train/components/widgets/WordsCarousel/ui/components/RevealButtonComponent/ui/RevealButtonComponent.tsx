import styles from './revealButtonComponent.module.css';
import { EyeIcon } from '@/icons';

export const RevealButtonComponent = ({ onClick }: { onClick: () => void }) => {
    return (
        <button onClick={onClick} className={styles.button}>
            <EyeIcon />
        </button>
    )
}