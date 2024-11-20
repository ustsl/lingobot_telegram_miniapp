'use client';

import styles from './settingsMenu.module.css'

import { PointName } from '@/components/shared/PointName';
import { GridBlock } from '@/components/shared/GridBlock';
import { useBaseStore, useModalStore, useUserStore } from '@/store/useStore';
import { postResponse } from '@/api/restAPI';
import { useTelegram } from '@/hooks/useTelegram';
import Link from 'next/link';
import { DeleteIcon } from '@/icons';

export const SettingsMenu = () => {
    const { tg } = useTelegram();

    const userId = useBaseStore((state: any) => state.userId);
    const trainType = useUserStore((state: any) => state.trainType);
    const setTrainType = useUserStore((state: any) => state.setTrainType);
    const { setOpenModal } = useModalStore((state: any) => state);

    function handleTrainTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newTrainType = event.target.value;
        const data = {
            method: '/customer/set_user_train_type/',
            data: {
                user: userId,
                train_type: newTrainType,
            },
        };
        postResponse(data);
        setTrainType(newTrainType);
    }

    function paymentTgHandler() {
        tg.sendData('payment');
    }

    return (
        <GridBlock gridSize='M'>
            <GridBlock gridSize="S">
                <PointName text="Режим перевода" />
                <GridBlock gridSize="XS">
                    <label>
                        <input
                            type="radio"
                            name="trainType"
                            value="TR"
                            checked={trainType === 'TR'}
                            onChange={handleTrainTypeChange}
                        />
                        С турецкого на русский
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="trainType"
                            value="RU"
                            checked={trainType === 'RU'}
                            onChange={handleTrainTypeChange}
                        />
                        С русского на турецкий
                    </label>
                </GridBlock>
            </GridBlock>
            <GridBlock gridSize="S">
                <PointName text={'Управление'} />
                <GridBlock gridSize="XS">
                    <Link href="/limits" target="new">
                        Изменить суточный лимит слов
                    </Link>
                    <Link href="/categories" target="new">
                        Настроить категории слов на изучение
                    </Link>
                    <Link href='https://t.me/ustsl'>Техническая поддержка</Link>
                </GridBlock>
            </GridBlock>
            <button onClick={setOpenModal} className={styles.danger}><DeleteIcon /><span>Сбросить прогресс тренировок</span></button>
        </GridBlock>
    );
};
