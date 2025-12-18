'use client';


import { PointName } from '@/components/shared/PointName';
import { GridBlock } from '@/components/shared/GridBlock';
import { useBaseStore, useUserStore } from '@/store/useStore';
import { postResponse } from '@/api/restAPI';
import { useTelegram } from '@/hooks/useTelegram';

import { SettingsIcon } from '@/icons';
import { LinkComponent } from '@/components/shared/LinkComponent';
import { DeleteProgressButton } from './components/DeleteProgressButton';

export const SettingsMenu = () => {

    useTelegram();
    const userId = useBaseStore((state: any) => state.userId);
    const trainType = useUserStore((state: any) => state.trainType);
    const setTrainType = useUserStore((state: any) => state.setTrainType);


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


    return (
        <GridBlock gridSize='M'>
            <GridBlock gridSize="S">
                <PointName text="Режим тренажера слов" icon={<SettingsIcon />} />
                <GridBlock gridSize="XS">
                    <label >
                        <input
                            type="radio"
                            name="trainType"
                            value="TR"
                            checked={trainType === 'TR'}
                            onChange={handleTrainTypeChange}
                        />
                        Перевод на русский
                    </label>
                    <label className='xslabel'>
                        <input
                            type="radio"
                            name="trainType"
                            value="RU"
                            checked={trainType === 'RU'}
                            onChange={handleTrainTypeChange}
                        />
                        Перевод с русского
                    </label>
                </GridBlock>
                <GridBlock gridSize="XS">
                    <LinkComponent href="/limits" text="Изменить суточный лимит слов" size='S' />
                    <LinkComponent href="/categories" text="Настроить категории слов на изучение" size='S' />
                </GridBlock>
            </GridBlock>
            <DeleteProgressButton />
        </GridBlock>
    );
};
