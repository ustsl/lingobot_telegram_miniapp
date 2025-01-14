'use client'

import { BodyComponent } from "@/components/shared/Body"
import { Header } from "@/components/widgets/Header"

import { BackHomeLink } from "@/components/features/BackHomeLink"
import { GridBlock } from "@/components/shared/GridBlock"
import { TitleBlockComponent } from "@/components/shared/TitleBlockComponent"
import { useEffect, useState } from "react"
import { useBaseStore } from "@/store/useStore"
import { postResponse } from "@/api/restAPI"
import { ItemsBlock } from "./components/ItemsBlock"
import { ISentenceListItem } from "./components/ItemsBlock/ui/itemsBlock.props"
import { Pagination } from "@/components/entities/Pagination"
import { FlexBlock } from "@/components/shared/FlexBlock"
import { HintComponent } from "@/components/shared/HintComponent"

export default function LimitPage() {

    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [count, setCount] = useState(0)
    const [results, setResults] = useState<ISentenceListItem[]>([])
    const [page, setPage] = useState<number>(1)
    const [nextPage, setNextPage] = useState<boolean>(false)
    const userId = useBaseStore((state: any) => state.userId);


    function handleDelete(id: number) {
        const data = {
            method: `/word_actions/delete_user_action`,
            data: {
                user: userId,
                id: id
            }
        };

        postResponse(data).then((res) => {
            if (res) {
                if (results.length < 2) {
                    setPage(1)
                }
                setResults((prevResults) =>
                    prevResults ? prevResults.filter((item) => item.id !== id) : []
                );
            }
        });

    }

    function handleLoad() {

        const data = {
            method: `/word_actions/get_user_list/${page > 0 ? `?page=${page}` : ``}`,
            data: {
                user: userId,
            }
        };

        postResponse(data).then((res) => {
            if (res?.next) {
                setNextPage(true)
            } else {
                setNextPage(false)
            }
            setResults(res?.results)
            setCount(res?.count)
        }).then(() =>
            setIsLoad(true));
    }

    useEffect(() => {
        setIsLoad(false)
        if (userId) {
            handleLoad()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);


    return (
        <>
            <Header />
            <BodyComponent>
                <FlexBlock>
                    <TitleBlockComponent tag="h1" size="M" text="Добавленные слова" />
                    {isLoad && <HintComponent text={`Всего слов: ${count}`} />}
                </FlexBlock>
                <GridBlock gridSize="L">
                    <ItemsBlock results={results} onDelete={handleDelete} />
                    {isLoad && results.length === 0 && <p>Добавьте первые слова для запоминания с помощью тренажера</p>}
                    {isLoad && <Pagination nextPage={nextPage} page={page} setPage={setPage} />}
                    <BackHomeLink />
                </GridBlock>
            </BodyComponent>
        </>
    )
}
