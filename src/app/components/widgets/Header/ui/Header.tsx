import styles from './header.module.css';

import { Logo } from "@/components/shared/Logo"


export const Header = () => {
    return (
        <div className={styles.header}>
            <Logo />
        </div>
    )
}