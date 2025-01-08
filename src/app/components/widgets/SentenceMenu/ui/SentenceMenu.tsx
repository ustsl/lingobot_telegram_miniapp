'use client'

import { GridBlock } from '@/components/shared/GridBlock';
import { PointName } from '@/components/shared/PointName';
import { IconMenuPoint } from '@/components/shared/IconMenuPoint';
import { RepeatIcon, } from '@/icons';
import { QuoteIcon } from '@/icons/ui/base/quoteIcon';



export const SentenceMenu = () => {

    return (
        <GridBlock gridSize='S'>
            <PointName text={'Тренировка фраз и предложений'} />
            <GridBlock gridSize='XS'>
                <IconMenuPoint text="Тренировать добавленные" link="/sentence/repeat" icon={<QuoteIcon />} size='L' />
            </GridBlock>
        </GridBlock>

    )
}