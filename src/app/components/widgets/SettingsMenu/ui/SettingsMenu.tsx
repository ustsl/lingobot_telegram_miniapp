import styles from './settingsMenu.module.css';

import { PointName } from '@/components/shared/PointName'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faBook, faWallet } from '@fortawesome/free-solid-svg-icons'
import { IconMenuPoint } from '@/components/shared/IconMenuPoint/ui/IconMenuPoint';


export const SettingsMenu = () => {
    return (
        <div>
            <PointName text={'Настройки'} />
            <div className={styles.grid}>
                <IconMenuPoint
                    link='https://lingobot.ru/book'
                    text="Лимиты слов"
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



        </div>
    )
}