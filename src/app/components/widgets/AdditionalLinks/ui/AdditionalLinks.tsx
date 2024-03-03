import styles from './additionalLinks.module.css';

import { BaseMenuPoint } from "@/components/shared/BaseMenuPoint"
import { GridBlock } from "@/components/shared/GridBlock"

export const AdditionalLinks = () => {
    return (
        <div className={styles.block}>
            <GridBlock gridSize="S">
                <BaseMenuPoint text="👉 Сбросить категорию УЖЕ ЗНАЮ" link="/" />
                <BaseMenuPoint text="👉 Сбросить весь прогресс" link="/" />
                <BaseMenuPoint text="📚 Как эффективно учить слова" link="/" />
            </GridBlock>
        </div>
    )
}