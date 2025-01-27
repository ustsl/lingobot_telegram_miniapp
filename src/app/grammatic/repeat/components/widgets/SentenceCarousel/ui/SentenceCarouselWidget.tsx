'use client'

import { postResponse } from "@/api/restAPI"
import { useBaseStore } from "@/store/useStore";

import { useState, useEffect } from 'react'


import { BackHomeLink } from '@/components/features/BackHomeLink';
import { GridBlock } from '@/components/shared/GridBlock';

import { HintComponent } from '@/components/shared/HintComponent';
import { SentenceData } from './sentenceCarouselWidget.props';
import { shuffleArray } from '@/functions/shuffleArray';
import { FlexBlock } from "@/components/shared/FlexBlock";
import { SentenceListTrainerModule } from "./components/SentenceListTrainerModule";
import { ErrorComponent, SuccessComponent } from "@/components/features/StatusComponent";


export const SentenceCarousel = () => {

    const [error, setError] = useState("")
    const [isFinish, setIsFinish] = useState(false)
    const [dataList, setDataList] = useState<SentenceData[]>([])

    const [isLoad, setIsLoad] = useState(false);
    const [limit, setLimit] = useState(0)

    const userId = useBaseStore((state: any) => state.userId)

    useEffect(() => {
        console.log('trainUseEffect')
        if (userId) {
            handleSetSentenceData(userId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);


    function handleSetSentenceData(userId: number) {
        console.log('get-sentences')
        const data = {
            method: "/sentence_actions/get_train_list/",
            data: { user: userId }
        }
        postResponse(data)
            .then((result: any) => {
                console.log(result)
                if (!result || result?.error) {
                    setError(result.error)
                }
                else if (result && result?.data && (result?.data).length > 0) {
                    setDataList(shuffleArray(result.data as SentenceData[]))
                    setLimit((result.data).length)

                } else {
                    setError("Добавьте первые предложения через переводчик или тренажер слов.")
                }
            }).then(() => {
                setIsLoad(true)
            })
    }


    return (
        <GridBlock gridSize="S">
            {isLoad &&
                <FlexBlock>
                    <HintComponent text={`Доступно для повторения: ${limit}`} />
                    <BackHomeLink />
                </FlexBlock>
            }

            {error && <ErrorComponent
                text={error} />
            }

            {
                isFinish &&
                <SuccessComponent
                    title={"Тренировка успешно завершена!"}
                    description={'Возвращайтесь к процессу завтра'} />
            }

            {
                isLoad && dataList.length > 0 &&
                <SentenceListTrainerModule sentenceList={dataList} setIsFinish={setIsFinish} setLimit={setLimit} />
            }

        </GridBlock>
    )
}