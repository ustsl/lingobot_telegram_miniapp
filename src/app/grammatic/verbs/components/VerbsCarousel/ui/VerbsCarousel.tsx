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

    const userId = useBaseStore((state: any) => state.userId)

    useEffect(() => {
        console.log('trainUseEffect')
        if (userId) {
            handleSetVerbsData(userId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    function handleSetVerbsData(userId: number) {

        const method = `/grammatic_actions/verbs/?user=${userId}`;

        getResponse(method)
            .then((result: any) => {
                if (!result || result?.error) {
                    setError(result.error)
                }
                else if (result && result?.data) {
                    const responseResult = result.data as VerbsResponse
                    setVerbsList(responseResult.verbs)
                    setLimit((responseResult.verbs).length)
                    console.log(responseResult)
                } else {
                    setError("Неизвестная ошибка.")
                }
            }).then(() => {
                setIsLoad(true)
            })
    }


    return (
        <GridBlock gridSize="S">
            {isLoad &&
                <FlexBlock>
                    <HintComponent text={`Осталось успешно ответить: ${limit}`} />
                    <BackHomeLink />
                </FlexBlock>
            }

            {error && <ErrorComponent
                text={error} />
            }

            {
                isFinish &&
                <SuccessComponent />
            }

            {
                isLoad && verbsList.length > 0 && !isFinish &&
                <VerbsQuiz verbsList={verbsList} setIsFinish={setIsFinish} setLimit={setLimit} />
            }

        </GridBlock>
    )
}