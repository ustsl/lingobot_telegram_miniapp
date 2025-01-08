import { Header } from '@/components/widgets/Header'
import { SentenceMenu } from './components/widgets/SentenceMenu'
import { BodyComponent } from '@/components/shared/Body'
import { BookLink } from './components/widgets/BookLink'
import { SettingsMenu } from './components/widgets/SettingsMenu'
import { ResetProgressComponent } from '@/components/entities/ResetProgressComponent'
import { ProfileMenu } from './components/widgets/ProfileMenu'
import { MainMenu } from './components/widgets/MainMenu'


export default function Home() {

  return (
    <>
      <Header />
      <BodyComponent>
        <MainMenu />
        <SentenceMenu />
        <ProfileMenu />
        <BookLink />
        <SettingsMenu />
      </BodyComponent>
      <ResetProgressComponent />
    </>
  )
}
