import { Header } from '@/components/widgets/Header'
import { BodyComponent } from '@/components/shared/Body'
import { SettingsMenu } from './components/widgets/SettingsMenu'
import { ResetProgressComponent } from '@/components/entities/ResetProgressComponent'
import { ProfileMenu } from './components/widgets/ProfileMenu'
import { MainMenu } from './components/widgets/MainMenu'
import { GrammaticMenu } from './components/widgets/GrammaticMenu'
import { GridBlock } from '@/components/shared/GridBlock'
import { LinkComponent } from '@/components/shared/LinkComponent'
import { DeleteProgressButton } from '@/components/features/DeleteProgressButton'


export default function Home() {

  return (
    <>
      <Header />
      <BodyComponent>
        <MainMenu />
        <SettingsMenu />
        <GrammaticMenu />
        <ProfileMenu />
        <GridBlock gridSize="XS">
          <LinkComponent href="https://lingobot.ru/book/" text="Учебник на сайте" size='S' />
          <LinkComponent href="https://t.me/ustsl" text="Техническая поддержка" size='S' />

        </GridBlock>
        <DeleteProgressButton />
      </BodyComponent>
      <ResetProgressComponent />
    </>
  )
}
