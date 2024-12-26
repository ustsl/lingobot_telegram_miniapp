'use client'

import styles from './profileMenu.module.css'

import { GridBlock } from '@/components/shared/GridBlock';

import { PointName } from '@/components/shared/PointName';

import { ButtonMenuPoint } from '@/components/shared/ButtonMenuPoint';


export const ProfileMenu = () => {

    return (
        <GridBlock gridSize='S'>
            <PointName text={'Хранилище'} />
            <div className={styles.block}>
                <ButtonMenuPoint link="/data/sentences" text="Добавленные предложения" />
                <ButtonMenuPoint link="/data/words" text="Добавленные слова" />
            </div>
        </GridBlock>

    )
}