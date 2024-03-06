'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { Header } from '@/components/widgets/Header'
import { MainMenu } from './components/widgets/MainMenu'
import { BodyComponent } from '@/components/shared/Body'
import { Footer } from '@/components/widgets/Footer'
import { BookLink } from './components/widgets/BookLink'
import { SettingsMenu } from './components/widgets/SettingsMenu'
import { AdditionalLinks } from './components/widgets/AdditionalLinks'

export default function Home() {
  return (
    <>
      <Header />
      <BodyComponent>
        <MainMenu />
        <BookLink />
        <SettingsMenu />
        <AdditionalLinks />
      </BodyComponent>
      <Footer />
    </>
  )
}
