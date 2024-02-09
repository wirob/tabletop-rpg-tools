import './globals.css'
import '@repo/ui/styles.css'
import { type Metadata } from 'next'
import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TTRPG tools',
  description: 'Tools for making any TTRPG moar funz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const chakraCookie = cookies().get('chakra-ui-color-mode')
  const colorMode = chakraCookie?.value || 'dark'

  return (
    <html data-theme={colorMode} lang="en" style={{ colorScheme: colorMode }}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
