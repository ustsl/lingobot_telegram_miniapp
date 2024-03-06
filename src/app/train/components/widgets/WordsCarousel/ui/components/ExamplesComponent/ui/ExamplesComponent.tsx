import styles from './exampleComponent.module.css';

import { ISentence } from "../../../wordsCarousel.props"
import { PointName } from '@/components/shared/PointName';

export const ExamplesComponent = ({ examples }: { examples: ISentence[] }) => {
    const shuffleArray = (array: ISentence[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffledExamples = shuffleArray([...examples]).slice(0, 3);

    return (
        <div className={styles.examples}>
            <PointName text="Примеры" />
            <div className={styles.list}>
                {shuffledExamples.map(item => {
                    return (<div key={item.pk} className={styles.example}>
                        <p className={styles.tr}>
                            {item.sentence}
                        </p>
                        <p className={styles.ru}>
                            {item.ru}
                        </p>

                    </div>)
                })}
            </div>
        </div>
    );
};
