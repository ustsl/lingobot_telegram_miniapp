'use client'

import { GridBlock } from '@/components/shared/GridBlock';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { PointName } from '@/components/shared/PointName';

import { IconMenuPoint } from '@/components/shared/IconMenuPoint';


export const MainMenu = () => {

    return (
        <GridBlock gridSize='XS'>
            <PointName text={'Тренировка слов'} />
            <GridBlock gridSize='S'>
                <IconMenuPoint text="Учить новые слова" link="/train/new" icon={<FontAwesomeIcon icon={faPlus} />} size='L' />
                <IconMenuPoint text="Повторить добавленные" link="/train/repeat" icon={<FontAwesomeIcon icon={faRepeat} />} size='L' />
            </GridBlock>
        </GridBlock>
    )
}