import { getBaseQuery } from "@/api/restAPI"
import { BodyComponent } from "@/components/shared/Body"
import { Header } from "@/components/widgets/Header"
import { NumberForm } from "./components/Form"
import { BackHomeLink } from "@/components/features/BackHomeLink"

export default async function SettingsPage() {

    return (
        <>
            <Header />
            <BodyComponent>
                <h1>Настройте лимиты</h1>
                <NumberForm />
                <BackHomeLink />

            </BodyComponent>
        </>
    )
}
