import { PointName } from '@/components/shared/PointName'

import Link from "next/link"

import { GridBlock } from '@/components/shared/GridBlock'

export const BookLink = () => {
    return (
        <GridBlock gridSize='S'>
            <PointName text={'Грамматика'} />
            <GridBlock gridSize='XS'>
                <Link href="https://lingobot.ru/book/" target='new'>Открыть учебник на сайте</Link>

            </GridBlock>
        </GridBlock>
    )
}