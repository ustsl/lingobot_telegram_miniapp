import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import styles from './exampleComponent.module.css';

import { ISentence } from "../../../wordsCarousel.props";
import { PointName } from '@/components/shared/PointName';

export const ExamplesComponent = ({ examples }: { examples: ISentence[] }) => {
    const [activeId, setActiveId] = useState(examples[0]?.pk || null);

    const handleSlideChange = (swiper: any) => {
        const currentSlideIndex = swiper.realIndex; // Индекс с учетом `loop`
        setActiveId(examples[currentSlideIndex]?.pk || null);
    };

    return (
        <div className={styles.examples}>
            <PointName text="Примеры" />
            <div className={styles.list}>
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={1}
                    className={styles.swiper}
                    loop={true}
                    onSlideChange={handleSlideChange}
                >
                    {examples.map((item) => (
                        <SwiperSlide key={item.pk} className={styles.example}>
                            <p className={styles.tr}>{item.sentence}</p>
                            <p className={styles.ru}>{item.ru}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
