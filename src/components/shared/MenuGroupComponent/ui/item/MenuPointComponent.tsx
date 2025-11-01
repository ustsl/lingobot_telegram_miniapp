import styles from './MenuPointComponent.module.css'
import Link from 'next/link'

export const MenuPointComponent = ({ text, href }: { text: string, href: string }) => {
    return (
        <Link href={href} className={styles.point}><span>{text}</span></Link>
    )
}