'use client'
import styles from './header.module.css';



import { Logo } from "@/components/shared/Logo"

import { useUserStore } from '@/store/useStore';

export const Header = () => {

    const subscribeFinishDate = useUserStore((state: any) => state.subscribeFinishDate)


    return (
        <div className={styles.header}>
            <Logo />
            {subscribeFinishDate && <div className={styles.data}>Подписка активна до: {subscribeFinishDate}</div>}
        </div>
    )
}