import styles from './verbsCarousel.module.css'

import { getResponse, } from "@/api/restAPI"
import { useState, useEffect } from "react"
import { Verb, VerbsResponse } from "./verbsCarousel.props"
import { useBaseStore } from "@/store/useStore"
import { GridBlock } from "@/components/shared/GridBlock"
import { FlexBlock } from "@/components/shared/FlexBlock"
import { HintComponent } from "@/components/shared/HintComponent"
import { BackHomeLink } from "@/components/features/BackHomeLink"
import { ErrorComponent, SuccessComponent } from "@/components/features/StatusComponent"
import { VerbsQuiz } from "./components/VerbsQuiz"

export const VerbsCarousel = () => {

    const [error, setError] = useState("")
    const [verbsList, setVerbsList] = useState<Verb[]>([])
    const [isFinish, setIsFinish] = useState(false)
    const [isLoad, setIsLoad] = useState(false);
    const [limit, setLimit] = useState(0)
    const [percentExperience, setPercentExperience] = useState("")

    const userId = useBaseStore((state: any) => state.userId)

    useEffect(() => {
        console.log('trainUseEffect')
        if (userId) {
            handleSetVerbsData(userId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    function handleSetVerbsData(userId: number) {

        const getWordsMethod = `/grammatic_actions/verbs/?user=${userId}`;

        getResponse(getWordsMethod)
            .then((result: any) => {
                if (!result || result?.error) {
                    setError(result.error)
                }
                else if (result && result?.data) {

                    const responseResult = result.data
                    console.log(responseResult)
                    if (responseResult.error) {
                        setError("Требуется активная подписка")
                    } else {
                        setVerbsList(responseResult.verbs as Verb[])
                        setLimit((responseResult.verbs).length)
                    }
                } else {
                    setError("Неизвестная ошибка.")
                }
            }).then(() => {
                setIsLoad(true)
            })

        const getStatMethod = `/grammatic_actions/statistic/?user=${userId}`;
        getResponse(getStatMethod)
            .then((result: any) => {
                if (result && result?.data && result.status == 200) {
                    const percentValue = result.data.average * 100
                    result = percentValue.toFixed(1)
                    setPercentExperience(result)
                }
            })

    }

    if (isFinish) {
        return <SuccessComponent
            title={"Тренировка успешно завершена!"}
            description={'Вы можете запустить ее в любой момент заново'} />
    }

    if (error) {
        return <ErrorComponent
            text={error} />
    }

    return (
        <GridBlock gridSize="S">
            {isLoad &&
                <FlexBlock>
                    <HintComponent text={`Осталось успешно ответить: ${limit}`} />
                    <BackHomeLink />
                </FlexBlock>
            }

            {
                isLoad && verbsList.length > 0 && !isFinish &&
                <VerbsQuiz
                    verbsList={verbsList}
                    setIsFinish={setIsFinish}
                    setLimit={setLimit}
                    userId={userId}
                    setPercentExperience={setPercentExperience} />
            }

            {isLoad && percentExperience && <GridBlock gridSize="S">
                <div className={styles.padding}>
                    <HintComponent
                        text={`Процент правильных ответов за\u00A0последние\u00A050\u00A0решений: ${percentExperience}%`} />

                </div>
            </GridBlock>}

        </GridBlock>
    )
}