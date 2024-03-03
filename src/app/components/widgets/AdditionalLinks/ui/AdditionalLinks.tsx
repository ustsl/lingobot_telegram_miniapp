import styles from './additionalLinks.module.css';

import { BaseMenuPoint } from "@/components/shared/BaseMenuPoint"
import { GridBlock } from "@/components/shared/GridBlock"

export const AdditionalLinks = () => {
    return (
        <div className={styles.block}>
            <GridBlock gridSize="S">
                <BaseMenuPoint text="👉 Сбросить категорию слов УЖЕ ЗНАЮ" link="/" />
                <BaseMenuPoint text="👉 Сбросить все прогресс" link="/" />
                <BaseMenuPoint text="📚 О приложении" link="/" />
            </GridBlock>
        </div>
    )
}