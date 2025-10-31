'use client'

import { GridBlock } from '@/components/shared/GridBlock';
import { PointName } from '@/components/shared/PointName';
import { IconMenuPoint } from '@/components/shared/IconMenuPoint';
import { RepeatIcon, } from '@/icons';
import { ExploreIcon } from '@/icons/ui/base/explore';
import { FlexBlock } from '@/components/shared/FlexBlock';
import { SimpleGrid } from '@/components/shared/SimpleGrid';


export const MainMenu = () => {

    return (
        <GridBlock gridSize='S'>
            <PointName text={'Тренировка слов'} icon={<ExploreIcon />} />
            <SimpleGrid gap={10} columns={2}>
                <IconMenuPoint text="Добавить новые" link="/train/new" size='S' fontSize='S' />
                <IconMenuPoint text="Тренировка словаря" link="/train/repeat" size='S' fontSize='S' />
            </SimpleGrid>
        </GridBlock>

    )
}