"use client";

import styles from './exampleComponent.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


import { ISentence } from "../../../wordsCarousel.props";
import { PointName } from '@/components/shared/PointName';
import { GridBlock } from '@/components/shared/GridBlock';
import { AddSentenceComponent } from '@/app/train/components/entities/AddSentenceComponent';
import { useState } from 'react';
import { useModalWrapper } from '@/components/shared/ModalWindowWrapper';
import { FlexBlock } from '@/components/shared/FlexBlock';
import { RegularButtonComponent } from '@/components/shared/RegularButtonComponent';
import { useBaseStore } from '@/store/useStore';

const PROMPT_IDS: Record<string, string> = {
    'tr-ru': 'aa5c1440-02d8-4e63-bbb2-a97c69e1bd29',
    'en-ru': '93991392-81a1-4c9f-9c67-b16cf8c4ceb7',
};

export const ExamplesComponent = ({ examples }: { examples: ISentence[] }) => {
    const [loadingPk, setLoadingPk] = useState<number | null>(null);
    const [errorState, setErrorState] = useState<{ pk: number; message: string } | null>(null);
    const { setContentModal, setIsOpenModal, setModalStyle } = useModalWrapper();
    const pair = useBaseStore((state: any) => state.pair) as string | null;

    const openRulesModal = (html: string, example: ISentence) => {
        setModalStyle('base');
        setContentModal(
            <div className={styles.rulesModal}>
                <h3>Правила</h3>
                <p className={styles.rulesSentence}>{example.sentence}</p>
                <div
                    className={styles.rulesContent}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        );
        setIsOpenModal(true);
    };

    const fetchSavedExplanation = async (sentenceId: number) => {
        try {
            const response = await fetch('/api/proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    method: `/sentence/common/${sentenceId}/explanation/`,
                    verb: 'GET',
                }),
            });

            if (!response.ok) {
                return null;
            }

            const payload = await response.json().catch(() => null);
            const content = typeof payload?.content === 'string' ? payload.content : '';
            if (content.trim()) {
                return content;
            }
            return null;
        } catch (error) {
            console.warn('Failed to fetch saved explanation', error);
            return null;
        }
    };

    const requestRulesFromAI = async (example: ISentence, promptId: string) => {
        const response = await fetch('/api/proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                method: 'imvoRules',
                verb: 'POST',
                data: {
                    prompt_id: promptId,
                    query: example.sentence,
                },
            }),
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(payload?.error || 'Не удалось получить правила');
        }

        const rulesHtml = payload?.result;

        if (!rulesHtml) {
            throw new Error('Правила отсутствуют для этого примера');
        }

        return rulesHtml as string;
    };

    const saveExplanation = async (sentenceId: number, content: string) => {
        try {
            await fetch('/api/proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    method: `/sentence/common/${sentenceId}/explanation/`,
                    verb: 'POST',
                    formData: true,
                    data: { content },
                }),
            });
        } catch (error) {
            console.warn('Failed to save explanation', error);
        }
    };

    const handleShowRules = async (example: ISentence) => {
        if (loadingPk) {
            return;
        }

        const normalizedPair = pair ? pair.toLowerCase() : '';
        const promptId = PROMPT_IDS[normalizedPair];
        if (!promptId) {
            setErrorState({ pk: example.pk, message: 'Правила недоступны для выбранной языковой пары' });
            return;
        }

        setErrorState(null);
        setLoadingPk(example.pk);

        try {
            const cachedExplanation = await fetchSavedExplanation(example.pk);

            if (cachedExplanation) {
                openRulesModal(cachedExplanation, example);
                return;
            }

            const aiRules = await requestRulesFromAI(example, promptId);
            openRulesModal(aiRules, example);
            await saveExplanation(example.pk, aiRules);
        } catch (error: any) {
            setErrorState({ pk: example.pk, message: error?.message || 'Неизвестная ошибка' });
        } finally {
            setLoadingPk(null);
        }
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
                >
                    {examples.map((item) => (
                        <SwiperSlide key={item.pk} className={styles.example}>
                            <div className={styles.slide}>
                                <GridBlock gridSize='XS'>
                                    <p className={styles.tr}>{item.sentence}</p>
                                    <p className={styles.ru}>{item.translate}</p>
                                </GridBlock>

                                <FlexBlock alignment='start'>
                                    <AddSentenceComponent sentence={item.sentence} translate={item.translate} />
                                    <RegularButtonComponent text={loadingPk === item.pk ? 'Загрузка...' : 'Правила'}
                                        onClick={() => handleShowRules(item)} />
                                </FlexBlock>

                                {errorState?.pk === item.pk && (
                                    <p className={styles.rulesError}>{errorState.message}</p>
                                )}
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
