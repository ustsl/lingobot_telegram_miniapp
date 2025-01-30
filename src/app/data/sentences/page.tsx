"use client";

import { BodyComponent } from "@/components/shared/Body";
import { Header } from "@/components/widgets/Header";
import { BackHomeLink } from "@/components/features/BackHomeLink";
import { GridBlock } from "@/components/shared/GridBlock";
import { useEffect, useRef, useState } from "react";
import { useBaseStore } from "@/store/useStore";
import { postResponse } from "@/api/restAPI";
import { ItemsBlock } from "./components/ItemsBlock";
import { ISentenceListItem } from "./components/ItemsBlock/ui/itemsBlock.props";
import { FlexBlock } from "@/components/shared/FlexBlock";
import { HintComponent } from "@/components/shared/HintComponent";
import { SearchStringComponent } from "@/components/entities/SearchStringComponent";

export default function LimitPage() {

    const [results, setResults] = useState<ISentenceListItem[]>([]);
    const [page, setPage] = useState<number>(1);
    const [nextPage, setNextPage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('')

    const userId = useBaseStore((state: any) => state.userId);

    const observer = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);


    function handleDelete(id: number) {
        const data = {
            method: `/sentence_actions/delete_user_action`,
            data: {
                user: userId,
                id: id,
            },
        };

        postResponse(data).then((res) => {
            if (res) {
                if (results.length < 2) {
                    setPage(1);
                    setResults([]);
                } else {
                    setResults((prevResults) =>
                        prevResults ? prevResults.filter((item) => item.id !== id) : []
                    );
                }
            }
        });
    }

    function handleLoad(isReset: boolean) {
        setIsLoading(true);

        const data = {
            method: `/sentence_actions/get_user_list${page > 0 ? `?page=${page}` : ""}`,
            data: {
                user: userId,
                search: search
            },
        };

        postResponse(data)
            .then((res) => {
                setNextPage(!!res?.next);
                setCount(res?.count || 0);
                if (!isReset) {
                    setResults((prev) => [...(prev || []), ...(res?.results || [])]);
                } else {
                    setResults(res?.results || [])
                }

            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    useEffect(() => {
        if (!userId) return;
        handleLoad(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, userId]);


    useEffect(() => {

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries) => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting && !isLoading && nextPage) {
                setPage((prev) => prev + 1);
            }
        });

        if (sentinelRef.current) {
            observer.current.observe(sentinelRef.current);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [nextPage, isLoading]);


    useEffect(() => {
        handleLoad(true)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    return (
        <>
            <Header />
            <BodyComponent>
                <FlexBlock>
                    {!isLoading ?
                        <HintComponent text={`Всего предложений: ${count}`} />
                        : <div></div>}
                    <BackHomeLink />
                </FlexBlock>

                <SearchStringComponent setSearchQuery={setSearch} />

                <GridBlock gridSize="L">
                    <ItemsBlock results={results} onDelete={handleDelete} />

                    {results && results.length === 0 && !isLoading && (
                        <p>
                            Добавьте первые предложения для запоминания из переводчика в чате,
                            или из тренажера
                        </p>
                    )}
                    {isLoading && <p>Загрузка...</p>}
                    <div ref={sentinelRef} style={{ height: 1, background: "transparent" }}></div>
                </GridBlock>
            </BodyComponent>
        </>
    );
}
