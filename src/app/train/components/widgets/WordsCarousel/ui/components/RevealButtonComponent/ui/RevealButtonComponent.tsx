import styles from './revealButtonComponent.module.css';

import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const RevealButtonComponent = ({ onClick }: { onClick: () => void }) => {
    return (
        <button onClick={onClick} className={styles.button}>
            <FontAwesomeIcon icon={faEye} />
        </button>
    )
}