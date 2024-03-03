import { PointName } from '@/components/shared/PointName'
import styles from './bookLink.module.css'
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { IconMenuPoint } from '@/components/shared/IconMenuPoint/ui/IconMenuPoint'

export const BookLink = () => {
    return (
        <div>
            <PointName text={'Грамматика'} />
            <IconMenuPoint
                link='https://lingobot.ru/book'
                text="Перейти к учебнику на сайте"
                icon={<FontAwesomeIcon icon={faBook} />}
                iconColor="success"
                size="L" />

        </div>
    )
}