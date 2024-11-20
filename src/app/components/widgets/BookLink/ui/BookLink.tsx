import { PointName } from '@/components/shared/PointName'

import Link from "next/link"

import { GridBlock } from '@/components/shared/GridBlock'

export const BookLink = () => {
    return (
        <GridBlock gridSize='S'>
            <PointName text={'Грамматика'} />
            <GridBlock gridSize='XS'>
                <Link href="https://lingobot.ru/book/bazovaja-chast" target='new'>Базовая часть</Link>
                <Link href="https://lingobot.ru/book/affiksy-izafety-i-posleslogi" target='new'>Аффиксы, изафеты и послеслоги</Link>
                <Link href="https://lingobot.ru/book/vremena" target='new'>Времена</Link>
                <Link href="https://lingobot.ru/book/deeprichastiya" target='new'>Деепричастия</Link>
                <Link href="https://lingobot.ru/book/sintaksicheskie-konstrukcii" target='new'>Синтаксические конструкции</Link>
            </GridBlock>
        </GridBlock>
    )
}