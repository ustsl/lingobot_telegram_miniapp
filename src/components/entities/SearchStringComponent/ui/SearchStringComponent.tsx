import { InputElement } from "@/components/shared/InputElement"
import { useEffect, useState } from "react"

export const SearchStringComponent = ({ setSearchQuery }: { setSearchQuery: (query: string) => void }) => {
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setSearchQuery(search);
        }, 500);
        return () => clearTimeout(debounceTimer);
    }, [search, setSearchQuery]);

    return (
        <InputElement handler={(e) => setSearch(e.target.value)} label={"Поиск по разделу"} value={search} size="s" />
    );
};