import { getBaseQuery } from "@/api/restAPI"
import { CategoryList } from "./components/CategoryList/ui/CategoryList"
import { BodyComponent } from "@/components/shared/Body"
import { Header } from "@/components/widgets/Header"

export default async function SettingsPage() {

    const res = await getBaseQuery('/word/get_word_categories')
    console.log(res)

    return (
        <>
            <Header />
            <BodyComponent>



                <h1>Выберите категории</h1>
                <CategoryList categories={res.results} />


            </BodyComponent>
        </>
    )
}
