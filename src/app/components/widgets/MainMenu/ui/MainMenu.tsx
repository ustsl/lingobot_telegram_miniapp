import { GridBlock } from '@/components/shared/GridBlock';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartSimple, faPlus, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { PointName } from '@/components/shared/PointName';
import { useTelegram } from '@/hooks/useTelegram';
import { IconMenuButtonPoint, IconMenuPoint } from '@/components/shared/IconMenuPoint';

export const MainMenu = () => {

    const { tg } = useTelegram()

    function statTgHandler() {
        tg.sendData('stat');
    }

    return (
        <GridBlock gridSize='XS'>
            <PointName text={'Тренировка слов'} />
            <GridBlock gridSize='XS'>

                <IconMenuPoint text="Учить новые слова" link="/train/new" icon={<FontAwesomeIcon icon={faPlus} />} />
                <IconMenuPoint text="Повторить добавленные" link="/train/repeat" icon={<FontAwesomeIcon icon={faRepeat} />} />
                <IconMenuPoint text="Настроить категории слов" link="/" icon={<FontAwesomeIcon icon={faBars} />} />
                <IconMenuButtonPoint text="Статистика выученных слов"
                    onClick={statTgHandler}
                    icon={<FontAwesomeIcon
                        icon={faChartSimple} />} />
            </GridBlock>
        </GridBlock>
    )
}