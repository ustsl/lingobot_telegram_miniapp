import styles from './footer.module.css';
import Link from "next/link"

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <Link href="https://t.me/ustsl" className={styles.link}>
                По вопросам работы приложения
            </Link>
        </div>
    )
}