'use client'
import styles from './header.module.css';
import { useState, useEffect } from 'react'

import { useTelegram } from '@/hooks/useTelegram';



import { Logo } from "@/components/shared/Logo"
import { postResponse } from '@/api/restAPI';
import { getDate } from '@/functions/getDate';
import { useBaseStore, useUserStore } from '@/store/useStore';

export const Header = () => {

    const subscribeFinishDate = useUserStore((state: any) => state.subscribeFinishDate)


    return (
        <div className={styles.header}>
            <Logo />
            <div className={styles.data}>Подписка активна до: {subscribeFinishDate}</div>
        </div>
    )
}