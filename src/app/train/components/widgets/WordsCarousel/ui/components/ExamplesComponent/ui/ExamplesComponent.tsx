import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import styles from './exampleComponent.module.css';

import { ISentence } from "../../../wordsCarousel.props";
import { PointName } from '@/components/shared/PointName';
import { useBaseStore } from '@/store/useStore';
import { RegularButtonComponent } from '@/components/shared/RegularButtonComponent';
import { GridBlock } from '@/components/shared/GridBlock';
import { AddSentenceComponent } from '@/app/train/components/entities/AddSentenceComponent';


export const ExamplesComponent = ({ examples }: { examples: ISentence[] }) => {

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
                >
                    {examples.map((item) => (
                        <SwiperSlide key={item.pk} className={styles.example}>
                            <div className={styles.slide}>
                                <GridBlock gridSize='XS'>
                                    <p className={styles.tr}>{item.sentence}</p>
                                    <p className={styles.ru}>{item.ru}</p>
                                </GridBlock>

                                <AddSentenceComponent sentence={item.sentence} ru={item.ru} />
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
