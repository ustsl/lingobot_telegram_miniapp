'use client'

import { useBaseStore } from '@/store/useStore';
import { useEffect } from 'react';

interface TelegramWebApp {
    close: () => void;
    sendData: Function;
    initDataUnsafe: {
        query_id: any;
        user: {
            username: string | undefined;
            id: number;
        }
    }
}

declare global {
    interface Window {
        Telegram: {
            WebApp: TelegramWebApp;
        };
    }
}

export function useTelegram() {

    const tg = useBaseStore((state: any) => state.tg)

    const setTg = useBaseStore((state: any) => state.setTg)


    useEffect(() => {

        console.log('useTelegram')

        function initTg() {
            if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
                console.log('Telegram WebApp is set');
                const tgData = window.Telegram.WebApp
                setTg(tgData);

            } else {
                console.log('Telegram WebApp is undefined, retrying...');
                setTimeout(initTg, 500);
            }
        }

        initTg();

    }, []);


    const onClose = () => {
        if (tg) {
            tg.close();
        }
    };

    // Подготавливаем данные для возврата из хука
    const user = tg?.initDataUnsafe?.user;
    const queryId = tg?.initDataUnsafe?.query_id;

    return {
        onClose,
        tg,
        user,
        queryId,
    };
}
