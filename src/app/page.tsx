import { Header } from '@/components/widgets/Header'
import { BodyComponent } from '@/components/shared/Body'
import { BookLink } from './components/widgets/BookLink'
import { SettingsMenu } from './components/widgets/SettingsMenu'
import { ResetProgressComponent } from '@/components/entities/ResetProgressComponent'
import { ProfileMenu } from './components/widgets/ProfileMenu'
import { MainMenu } from './components/widgets/MainMenu'
import { GrammaticMenu } from './components/widgets/GrammaticMenu'


export default function Home() {

  return (
    <>
      <Header />
      <BodyComponent>
        <MainMenu />
        <GrammaticMenu />
        <ProfileMenu />
        <BookLink />
        <SettingsMenu />
      </BodyComponent>
      <ResetProgressComponent />
    </>
  )
}
