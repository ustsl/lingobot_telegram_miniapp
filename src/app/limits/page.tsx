import { getBaseQuery } from "@/api/restAPI"
import { BodyComponent } from "@/components/shared/Body"
import { Header } from "@/components/widgets/Header"
import { NumberForm } from "./components/Form"

export default async function SettingsPage() {

    return (
        <>
            <Header />
            <BodyComponent>
                <h1>Настройте лимиты</h1>
                <NumberForm />
            </BodyComponent>
        </>
    )
}
