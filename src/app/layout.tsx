
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { ScriptsBlock } from '@/components/shared/ScriptComponent/ui/ScriptComponent'
import { TelegramWrapper } from '@/components/shared/TelegramWrapper'
import { ModalWindowWrapper } from '@/components/shared/ModalWindowWrapper'



const inter = Manrope({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Lingobot for Telegram. Учить турецкие слова',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <ScriptsBlock />
      <body className={inter.className}>
        <TelegramWrapper>
          {children}
        </TelegramWrapper>
        <ModalWindowWrapper />
      </body>
    </html >
  )
}
