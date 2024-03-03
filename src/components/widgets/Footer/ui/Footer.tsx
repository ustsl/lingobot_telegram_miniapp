import { BaseMenuPoint } from '@/components/shared/BaseMenuPoint';
import styles from './footer.module.css';
import Link from "next/link"

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <BaseMenuPoint text="Написать администратору" link="https://t.me/ustsl" />
        </div>
    )
}