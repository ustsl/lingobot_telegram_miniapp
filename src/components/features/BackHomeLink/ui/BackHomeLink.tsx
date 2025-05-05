import styles from './backHomeLink.module.css';

import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { BackIcon } from '@/icons';


export const BackHomeLink = () => {
    return (
        <Link href="/" className={styles.link}>
            <BackIcon />
            <span>Вернуться назад</span>
        </Link>
    )
}