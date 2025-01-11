'use client';

import styles from './form.module.css';

import { postResponse } from '@/api/restAPI';
import { ButtonComponent } from '@/components/shared/ButtonComponent';
import { NotificationComponent } from '@/components/features/NotificationMessage';
import { GridBlock } from '@/components/shared/GridBlock';
import { useBaseStore, useUserStore } from '@/store/useStore';
import React, { useState } from 'react';

export const NumberForm = () => {
    const userId = useBaseStore((state: any) => state.userId);
    const newWordLimit = useUserStore((state: any) => state.newWordLimit);
    const repeatWordLimit = useUserStore((state: any) => state.repeatWordLimit);

    const setNewWordLimit = useUserStore((state: any) => state.setNewWordLimit);
    const setRepeatWordLimit = useUserStore((state: any) => state.setRepeatWordLimit);

    const [newLimit, setNewLimit] = useState<number>(newWordLimit);
    const [repeatLimit, setRepeatLimit] = useState<number>(repeatWordLimit);

    const [isChange, setIsChange] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
        setIsChange(true);
        const value = e.target.value;
        if (!isNaN(Number(value))) {
            setter(Number(value));
        }
    };

    const handleSave = () => {
        setNotificationMessage('');
        setNewWordLimit(newLimit);
        setRepeatWordLimit(repeatLimit);
        const data = {
            method: '/customer/set_word_limit/',
            data: {
                user: userId,
                new_word_limit: newLimit,
                repeat_word_limit: repeatLimit,
            },
        };
        postResponse(data).then((res) => {
            if (res?.status === false) {
                setNotificationMessage('Для изменения лимитов требуется подписка. Вне подписки лимиты всегда равны 3/3.');
            } else {
                setNotificationMessage('Изменения успешно сохранены');
            }
        });
        setIsChange(false);
    };

    return (
        <GridBlock gridSize="S">
            {/* Ползунок для лимита новых слов */}
            <div className={styles.sliderContainer}>
                <label htmlFor="newLimitSlider">
                    Установите лимит новых слов в день: <strong>{newLimit}</strong>
                </label>
                <input
                    id="newLimitSlider"
                    className={styles.slider}
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={newLimit}
                    onChange={(e) => handleSliderChange(e, setNewLimit)}
                />
            </div>

            {/* Ползунок для лимита повторений */}
            <div className={styles.sliderContainer}>
                <label htmlFor="repeatLimitSlider">
                    Установите лимит повторений в день: <strong>{repeatLimit}</strong>
                </label>
                <input
                    id="repeatLimitSlider"
                    className={styles.slider}
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={repeatLimit}
                    onChange={(e) => handleSliderChange(e, setRepeatLimit)}
                />
            </div>

            {isChange && <ButtonComponent text="Сохранить" onClick={handleSave} />}
            {notificationMessage && <NotificationComponent message={notificationMessage} />}
        </GridBlock>
    );
};
