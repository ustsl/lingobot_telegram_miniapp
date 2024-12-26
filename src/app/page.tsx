import { Header } from '@/components/widgets/Header'
import { MainMenu } from './components/widgets/MainMenu'
import { BodyComponent } from '@/components/shared/Body'
import { BookLink } from './components/widgets/BookLink'
import { SettingsMenu } from './components/widgets/SettingsMenu'
import { ResetProgressComponent } from '@/components/entities/ResetProgressComponent'
import { ProfileMenu } from './components/widgets/ProfileMenu'


export default function Home() {

  return (
    <>
      <Header />
      <BodyComponent>
        <MainMenu />
        <ProfileMenu />
        <BookLink />
        <SettingsMenu />
      </BodyComponent>
      <ResetProgressComponent />
    </>
  )
}
