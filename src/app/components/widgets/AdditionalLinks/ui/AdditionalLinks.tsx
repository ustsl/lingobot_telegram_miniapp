import styles from './additionalLinks.module.css';

import { BaseMenuButtonPoint, } from "@/components/shared/BaseMenuPoint"
import { GridBlock } from "@/components/shared/GridBlock"
import { useTelegram } from '@/hooks/useTelegram';

export const AdditionalLinks = () => {

    const { tg } = useTelegram()

    function resetTgHandler() {
        tg.sendData('resetWords');
    }

    function aboutTgHandler() {
        tg.sendData('about');
    }

    function methodTgHandler() {
        tg.sendData('method');
    }

    return (
        <div className={styles.block}>
            <GridBlock gridSize="XS">
                <BaseMenuButtonPoint text="👉 Сбросить слова, отмеченные как УЖЕ ЗНАЮ" onClick={resetTgHandler} />
                <BaseMenuButtonPoint text="📚 Как эффективно учить слова" onClick={aboutTgHandler} />
                <BaseMenuButtonPoint text="📚 О приложении" onClick={methodTgHandler} />
            </GridBlock>
        </div>
    )
}