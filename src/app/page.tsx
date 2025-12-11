import { Header } from '@/components/widgets/Header'
import { BodyComponent } from '@/components/shared/Body'
import { SettingsMenu } from '../components/features/SettingsMenu'
import { ResetProgressComponent } from '@/components/entities/ResetProgressComponent'

import { GridBlock } from '@/components/shared/GridBlock'
import { LinkComponent } from '@/components/shared/LinkComponent'

import { FooterMenuComponent, MenuGroupComponent, MenuPointComponent } from '@/components/shared/MenuGroupComponent'
import { ExploreIcon } from '@/icons/ui/base/explore'
import { TrainIcon } from '@/icons/ui/base/train'
import { WordAnalyticsWidget } from '@/components/widgets/WordAnalyticsWidget'


export default function Home() {

  return (
    <>
      <Header />
      <BodyComponent>
        <MenuGroupComponent title="Тренажер слов" icon={<ExploreIcon />}>
          <MenuPointComponent text={'Выбрать новые слова на изучение'} href={'/train/new'} />
          <MenuPointComponent text={'Интервальное повторение словаря'} href={'/train/repeat'} />
          <MenuPointComponent text={'Открыть текущий словарь'} href={'/data/words'} />
          <FooterMenuComponent title={'Настроить тренажер слов'} children={<SettingsMenu />} />
        </MenuGroupComponent>

        <WordAnalyticsWidget />

        <MenuGroupComponent title="Дополнительные тренажеры" icon={<TrainIcon />}>
          <MenuPointComponent text={'Собираем предложения из слов'} href={'/grammatic/repeat'} />
          <MenuPointComponent text={'Открыть добавленные предложения'} href={'/data/sentences'} />

        </MenuGroupComponent>


        <GridBlock gridSize="XS">
          <LinkComponent href="https://lingobot.ru/book/" text="Учебник на сайте" size='S' />
          <LinkComponent href="https://t.me/ustsl" text="Техническая поддержка" size='S' />

        </GridBlock>

      </BodyComponent >
      <ResetProgressComponent />
    </>
  )
}
