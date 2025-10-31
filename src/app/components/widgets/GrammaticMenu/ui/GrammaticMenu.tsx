'use client'

import { GridBlock } from '@/components/shared/GridBlock';
import { PointName } from '@/components/shared/PointName';
import { IconMenuPoint } from '@/components/shared/IconMenuPoint';

import { TrainIcon } from '@/icons/ui/base/train';
import { QuoteIcon } from '@/icons/ui/base/quoteIcon';
import { SimpleGrid } from '@/components/shared/SimpleGrid';



export const GrammaticMenu = () => {

    return (
        <GridBlock gridSize='S'>
            <PointName text={'Тренажеры глаголов и предложений'} icon={<TrainIcon />} />
            <SimpleGrid>
                <IconMenuPoint text="Глаголы" link="/grammatic/verbs" size='S' fontSize='S' />
                <IconMenuPoint text="Предложения" link="/grammatic/repeat" size='S' fontSize='S' />
            </SimpleGrid>
        </GridBlock>

    )
}