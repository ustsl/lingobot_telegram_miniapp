import { getBaseQuery } from "@/api/restAPI"
import { BodyComponent } from "@/components/shared/Body"
import { Header } from "@/components/widgets/Header"
import { NumberForm } from "./components/Form"
import { BackHomeLink } from "@/components/features/BackHomeLink"
import { GridBlock } from "@/components/shared/GridBlock"
import { TitleBlockComponent } from "@/components/shared/TitleBlockComponent"

export default async function SettingsPage() {

    return (
        <>
            <Header />
            <BodyComponent>
                <TitleBlockComponent tag="h1" size="M" text="Настройте лимиты" />
                <GridBlock gridSize="L">
                    <NumberForm />
                    <BackHomeLink />
                </GridBlock>

            </BodyComponent>
        </>
    )
}
