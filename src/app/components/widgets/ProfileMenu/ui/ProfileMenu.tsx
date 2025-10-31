'use client'

import styles from './profileMenu.module.css'

import { GridBlock } from '@/components/shared/GridBlock';

import { PointName } from '@/components/shared/PointName';

import { ButtonMenuPoint } from '@/components/shared/ButtonMenuPoint';
import { EyeIcon } from '@/icons';
import { IconMenuPoint } from '@/components/shared/IconMenuPoint';


export const ProfileMenu = () => {

    return (
        <GridBlock gridSize='S'>
            <PointName text={'Статистика'} icon={<EyeIcon />} />
            <div className={styles.block}>
                <IconMenuPoint text="Ваши предложения" link="/data/sentences" size='S' fontSize='S' />
                <IconMenuPoint text="Ваш словарь" link="/data/words" size='S' fontSize='S' />
            </div>
        </GridBlock>

    )
}