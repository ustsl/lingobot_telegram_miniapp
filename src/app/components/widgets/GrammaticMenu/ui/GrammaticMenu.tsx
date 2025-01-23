'use client'

import { GridBlock } from '@/components/shared/GridBlock';
import { PointName } from '@/components/shared/PointName';
import { IconMenuPoint } from '@/components/shared/IconMenuPoint';

import { TrainIcon } from '@/icons/ui/base/train';
import { QuoteIcon } from '@/icons/ui/base/quoteIcon';



export const GrammaticMenu = () => {

    return (
        <GridBlock gridSize='S'>
            <PointName text={'Тренировка грамматики'} />
            <GridBlock gridSize='XS'>
                <IconMenuPoint text="Спряжение глаголов" link="/grammatic/verbs" icon={<TrainIcon />} size='L' />
                <IconMenuPoint text="Составление предложений" link="/grammatic/repeat" icon={<QuoteIcon />} size='L' />
            </GridBlock>
        </GridBlock>

    )
}