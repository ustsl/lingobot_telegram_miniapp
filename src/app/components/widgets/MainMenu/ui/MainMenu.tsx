'use client'

import { GridBlock } from '@/components/shared/GridBlock';
import { PointName } from '@/components/shared/PointName';
import { IconMenuPoint } from '@/components/shared/IconMenuPoint';
import { RepeatIcon, } from '@/icons';
import { ExploreIcon } from '@/icons/ui/base/explore';


export const MainMenu = () => {

    return (
        <GridBlock gridSize='S'>
            <PointName text={'Тренировка слов'} />
            <GridBlock gridSize='XS'>
                <IconMenuPoint text="Добавить новые слова" link="/train/new" icon={<ExploreIcon />} size='L' />
                <IconMenuPoint text="Тренировать добавленные" link="/train/repeat" icon={<RepeatIcon />} size='L' />
            </GridBlock>
        </GridBlock>

    )
}