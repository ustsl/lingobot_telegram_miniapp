import styles from './baseMenuPoint.module.css';

import Link from "next/link"


export const BaseMenuPoint = ({ link, text }: { link: string, text: string }) => {
    return (
        <Link href={link} className={styles.link}>{text}</Link>
    )
}
