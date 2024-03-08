import styles from './additionalLinks.module.css';

import { BaseMenuPoint } from "@/components/shared/BaseMenuPoint"
import { GridBlock } from "@/components/shared/GridBlock"

export const AdditionalLinks = () => {
    return (
        <div className={styles.block}>
            <GridBlock gridSize="XS">
                <BaseMenuPoint text="👉 Сбросить категорию УЖЕ ЗНАЮ" link="/" />
                <BaseMenuPoint text="📚 Как эффективно учить слова" link="/" />
                <BaseMenuPoint text="📚 О приложении" link="/" />
            </GridBlock>
        </div>
    )
}