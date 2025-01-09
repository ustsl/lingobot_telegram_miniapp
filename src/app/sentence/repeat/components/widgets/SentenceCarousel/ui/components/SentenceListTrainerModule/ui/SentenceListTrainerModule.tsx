import React, { useEffect, useState } from "react";
import { SentenceData } from "../../../sentenceCarouselWidget.props";
import { CardWrapper } from "@/components/shared/CardWrapper";

import { SentenceBuilderComponent } from "./components/SentenceBuilderComponent";
import { GridBlock } from "@/components/shared/GridBlock";
import { sendSentenceProgress } from "@/functions/sendProgress";
import { useBaseStore } from "@/store/useStore";
import { CardAnimationWrapper } from "@/components/shared/CardAnimationWrapper";

interface Props {
    sentenceList: SentenceData[];
    setIsFinish: (data: boolean) => void;
    setLimit: (data: number) => void;
}

export const SentenceListTrainerModule: React.FC<Props> = ({
    sentenceList,
    setIsFinish,
    setLimit,
}) => {
    const [data, setData] = useState<SentenceData[]>(sentenceList);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Этот стейт будет менять ключ для дочернего компонента
    // и заставлять его перевмонтироваться при скипе
    const [childKey, setChildKey] = useState<number>(0);

    const userId = useBaseStore((state: any) => state.userId);

    useEffect(() => {
        setLimit(data.length);
        if (data.length === 0) {
            setIsFinish(true);
            return;
        }
    }, [data, setIsFinish, setLimit]);

    const handleNext = () => {
        console.log(userId, data[currentIndex])
        sendSentenceProgress(userId, data[currentIndex].id, true);

        const newData = [...data];
        newData.splice(currentIndex, 1);

        setData(newData);

        if (currentIndex >= newData.length) {
            setCurrentIndex(0);
        }
    };

    const handleSkip = () => {
        // Сообщаем о пропуске
        sendSentenceProgress(userId, data[currentIndex].id, false);

        // Инкрементируем childKey, чтобы перевмонтировать компонент
        setChildKey((prev) => prev + 1);

        // Пролистываем дальше только если есть куда
        if (currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0)
        }
        // Если элементов 1 или мы на последнем, 
        // всё равно повысится childKey и компонент перерисуется заново
    };

    const currentItem = data[currentIndex];
    const keyUniq = currentItem.id

    return (
        <>
            {data.length > 0 && currentItem && (
                <CardAnimationWrapper keyUniq={keyUniq}>
                    <CardWrapper>
                        <GridBlock gridSize="M">
                            <p>{currentItem.ru}</p>

                            <SentenceBuilderComponent
                                key={childKey}
                                sentence={currentItem.sentence}
                                handleNext={handleNext}
                                handleSkip={handleSkip}
                            />
                        </GridBlock>
                    </CardWrapper>
                </CardAnimationWrapper>
            )}
        </>

    );
};
