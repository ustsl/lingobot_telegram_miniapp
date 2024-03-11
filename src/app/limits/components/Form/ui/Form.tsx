'use client'

import { postResponse } from '@/api/restAPI';
import { ButtonComponent } from '@/app/train/components/shared/ButtonComponent';
import { NotificationComponent } from '@/components/features/NotificationMessage';
import { GridBlock } from '@/components/shared/GridBlock';
import { InputElement } from '@/components/shared/InputElement';
import { useBaseStore, useUserStore } from '@/store/useStore';
import React, { useState } from 'react';

export const NumberForm = () => {

    const userId = useBaseStore((state: any) => state.userId)
    const newWordLimit = useUserStore((state: any) => state.newWordLimit)
    const repeatWordLimit = useUserStore((state: any) => state.repeatWordLimit)
    const setNewWordLimit = useUserStore((state: any) => state.setNewWordLimit)
    const setRepeatWordLimit = useUserStore((state: any) => state.setRepeatWordLimit)
    const [newLimit, setNewLimit] = useState<number>(newWordLimit);
    const [repeatLimit, setRepeatLimit] = useState<number>(repeatWordLimit);
    const [isChange, setIsChange] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleInputChange = (e: any, setter: any) => {
        setIsChange(true);
        const value = e.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            setter(Number(value));
        }

    };

    // Функция для обработки нажатия на кнопку "Сохранить"
    const handleSave = () => {
        setNotificationMessage('');
        setNewWordLimit(newLimit);
        setRepeatWordLimit(repeatLimit)
        const data = {
            method: '/customer/set_word_limit/',
            data: {
                user: userId,
                new_word_limit: newLimit,
                repeat_word_limit: repeatLimit
            }
        }
        postResponse(data).then(() => {
            setNotificationMessage('Изменения успешно сохранены')
        });
        setIsChange(false);
    };

    return (
        <GridBlock gridSize='M'>

            <InputElement
                label='Установите лимит новых слов в день'
                type="number"
                value={newLimit}
                handler={(e: any) => handleInputChange(e, setNewLimit)} />

            <InputElement
                label='Установите лимит повторений в день'
                type="number"
                value={repeatLimit}
                handler={(e: any) => handleInputChange(e, setRepeatLimit)} />


            {isChange && <ButtonComponent text="Сохранить" onClick={handleSave} />}
            {notificationMessage && <NotificationComponent message={notificationMessage} />}

        </GridBlock>
    );
}
