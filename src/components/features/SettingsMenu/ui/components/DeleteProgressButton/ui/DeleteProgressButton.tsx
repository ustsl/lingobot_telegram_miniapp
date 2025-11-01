'use client'

import { useModalStore } from '@/store/useStore';
import styles from './DeleteProgressButton.module.css'
import { DeleteIcon } from '@/icons';
export const DeleteProgressButton = () => {
    const { setOpenModal } = useModalStore((state: any) => state);

    return (
        <button onClick={setOpenModal} className={styles.danger}><DeleteIcon />
            <span>Сбросить прогресс тренировок</span></button>
    )
}