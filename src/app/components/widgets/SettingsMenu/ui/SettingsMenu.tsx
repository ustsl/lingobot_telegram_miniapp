import styles from './settingsMenu.module.css';

import { PointName } from '@/components/shared/PointName'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faBook, faWallet } from '@fortawesome/free-solid-svg-icons'
import { IconMenuPoint } from '@/components/shared/IconMenuPoint/ui/IconMenuPoint';
import { GridBlock } from '@/components/shared/GridBlock';


export const SettingsMenu = () => {
    return (
        <GridBlock gridSize='XS'>
            <PointName text={'Управление'} />
            <div className={styles.grid}>
                <IconMenuPoint
                    link='https://lingobot.ru/book'
                    text="Настройки тренировок"
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



        </GridBlock>
    )
}