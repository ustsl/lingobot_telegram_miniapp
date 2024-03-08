'use client';

import styles from './settingsMenu.module.css';

import { PointName } from '@/components/shared/PointName'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faBook, faCheck, faWallet } from '@fortawesome/free-solid-svg-icons'
import { IconMenuButtonPoint, IconMenuPoint } from '@/components/shared/IconMenuPoint/ui/IconMenuPoint';
import { GridBlock } from '@/components/shared/GridBlock';
import { useUserStore } from '@/store/useStore';


export const SettingsMenu = () => {

    const trainType = useUserStore((state: any) => state.trainType)
    const setTrainType = useUserStore((state: any) => state.setTrainType)

    return (
        <GridBlock gridSize='XS'>
            <PointName text={'Управление'} />

            <IconMenuPoint
                link='/categories'
                text="Выбрать категории слов"
                fontSize='S'
                icon={<FontAwesomeIcon icon={faBarsProgress} />}
            />
            <div className={styles.grid}>
                <IconMenuPoint
                    link='/limits'
                    text="Суточный лимит слов"
                    fontSize='S'
                    icon={<FontAwesomeIcon icon={faBarsProgress} />}
                />

                <IconMenuPoint
                    link='https://lingobot.ru/book'
                    text="Оплатить"
                    fontSize='S'
                    icon={<FontAwesomeIcon icon={faWallet} />}
                />

            </div>
            <IconMenuButtonPoint size="S"
                text={trainType == "TR" ? "Режим перевода: с турецкого на русский" : "Режим перевода: с русского на турецкий"}
                icon={<FontAwesomeIcon icon={faCheck} />}
                onClick={() => console.log(13)}

            />



        </GridBlock>
    )
}