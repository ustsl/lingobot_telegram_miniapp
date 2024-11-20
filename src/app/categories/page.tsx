import { getBaseQuery } from "@/api/restAPI"
import { CategoryList } from "./components/CategoryList"
import { BodyComponent } from "@/components/shared/Body"
import { Header } from "@/components/widgets/Header"
import { BackHomeLink } from "@/components/features/BackHomeLink"
import { GridBlock } from "@/components/shared/GridBlock"
import { TitleBlockComponent } from "@/components/shared/TitleBlockComponent"

export default async function SettingsPage() {

    const res = await getBaseQuery('/word/get_word_categories')

    return (
        <>
            <Header />
            <BodyComponent>
                <TitleBlockComponent tag="h1" size="M" text="Выберите категорию" />
                <GridBlock gridSize="L">
                    <CategoryList categories={res.results} />
                    <BackHomeLink />
                </GridBlock>
            </BodyComponent>
        </>
    )
}
