import styles from './header.module.css';

import { Logo } from "@/components/shared/Logo"
import { UpperMenu } from "./components/widgets/UpperMenu"

export const Header = () => {
    return (
        <div className={styles.header}>
            <Logo />
            <UpperMenu />
        </div>
    )
}