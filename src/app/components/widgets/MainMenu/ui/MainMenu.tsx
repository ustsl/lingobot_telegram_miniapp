import styles from './mainMenu.module.css';

import { GridBlock } from '@/components/shared/GridBlock';
import { IconMenuPoint } from '@/components/shared/IconMenuPoint/ui/IconMenuPoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { PointName } from '@/components/shared/PointName';

export const MainMenu = () => {
    return (
        <div>
            <PointName text={'Тренировка слов'} />
            <GridBlock gridSize='XS'>
                <IconMenuPoint text="Добавить новые слова" link="sdf" icon={<FontAwesomeIcon icon={faPlus} />} />
                <IconMenuPoint text="Повторить добавленные" link="sdf" icon={<FontAwesomeIcon icon={faRepeat} />} />
                <IconMenuPoint text="Настроить категории слов" link="sdf" icon={<FontAwesomeIcon icon={faBars} />} />
            </GridBlock>
        </div>
    )
}