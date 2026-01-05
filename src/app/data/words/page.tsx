'use client'

import { useEffect, useRef, useState } from "react"
import { BodyComponent } from "@/components/shared/Body"
import { Header } from "@/components/widgets/Header"
import { BackHomeLink } from "@/components/features/BackHomeLink"
import { GridBlock } from "@/components/shared/GridBlock"
import { useBaseStore } from "@/store/useStore"
import { postResponse } from "@/api/restAPI"
import { paginatedFetch } from "@/api/paginatedFetch"
import { ItemsBlock } from "./components/ItemsBlock"
import { ISentenceListItem } from "./components/ItemsBlock/ui/itemsBlock.props"
import { FlexBlock } from "@/components/shared/FlexBlock"
import { HintComponent } from "@/components/shared/HintComponent"
import { SearchStringComponent } from "@/components/entities/SearchStringComponent"

export default function LimitPage() {
    const userId = useBaseStore((s: any) => s.userId)
    const pair = useBaseStore((s: any) => s.pair)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [results, setResults] = useState<ISentenceListItem[]>([])
    const [count, setCount] = useState(0)
    const [nextPage, setNextPage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const observer = useRef<IntersectionObserver | null>(null)
    const sentinelRef = useRef<HTMLDivElement | null>(null)

    function handleDelete(id: number) {
        const data = {
            method: `/word_actions/delete_user_action`,
            data: { user: userId, id }
        }
        postResponse(data).then(res => {
            if (res) {
                if (results.length < 2) setPage(1)
                setResults(prev => prev.filter(item => item.id !== id))
            }
        })
    }

    function handleLoad(isReset: boolean) {
        setIsLoading(true)
        const currentPage = isReset ? 1 : page

        paginatedFetch<ISentenceListItem>(
            "/word_actions/get_user_list",
            currentPage,
            { user: userId, search, pair }
        )
            .then(({ results: items, count, next }) => {
                setCount(count)
                setNextPage(!!next)
                setResults(prev => isReset ? items : [...prev, ...items])
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        if (!userId || !pair) return;
        if (page !== 1) {
            handleLoad(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, userId, pair]);


    // сброс и загрузка при изменении поиска
    useEffect(() => {
        setPage(1)
        handleLoad(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    // бесконечный скролл
    useEffect(() => {
        observer.current?.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isLoading && nextPage) {
                setPage(p => p + 1)
            }
        })
        if (sentinelRef.current) observer.current.observe(sentinelRef.current)
        return () => { observer.current?.disconnect() }
    }, [isLoading, nextPage])

    return (
        <>
            <Header />
            <BodyComponent>
                <FlexBlock>
                    {!isLoading
                        ? <HintComponent text={`Всего слов: ${count}`} />
                        : <div />}
                    <BackHomeLink />
                </FlexBlock>

                <SearchStringComponent setSearchQuery={setSearch} />

                <GridBlock gridSize="L">
                    <ItemsBlock results={results} onDelete={handleDelete} />

                    {!isLoading && results.length === 0 &&
                        <p>Добавьте первые слова для запоминания с помощью тренажера</p>
                    }

                    {isLoading && <p>Загрузка...</p>}

                    {!isLoading && results.length > 0 &&
                        <div ref={sentinelRef} style={{ height: 1, background: "transparent" }} />
                    }
                </GridBlock>
            </BodyComponent>
        </>
    )
}
