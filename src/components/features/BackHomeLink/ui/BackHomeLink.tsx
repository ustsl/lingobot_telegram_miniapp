import styles from './backHomeLink.module.css';

import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"


export const BackHomeLink = () => {
    return (
        <Link href="/" className={styles.link}>
            <FontAwesomeIcon icon={faChevronLeft} height={14} width={14} />
            <span>Вернуться назад</span>
        </Link>
    )
}