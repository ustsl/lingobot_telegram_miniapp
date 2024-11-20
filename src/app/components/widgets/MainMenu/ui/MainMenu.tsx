'use client'

import { GridBlock } from '@/components/shared/GridBlock';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { PointName } from '@/components/shared/PointName';

import { IconMenuPoint } from '@/components/shared/IconMenuPoint';
import { RepeatIcon, StudyIcon } from '@/icons';


export const MainMenu = () => {

    return (
        <GridBlock gridSize='S'>
            <PointName text={'Тренировка слов'} />
            <GridBlock gridSize='XS'>
                <IconMenuPoint text="Учить новые слова" link="/train/new" icon={<StudyIcon />} size='L' />
                <IconMenuPoint text="Повторить добавленные" link="/train/repeat" icon={<RepeatIcon />} size='L' />
            </GridBlock>
        </GridBlock>

    )
}