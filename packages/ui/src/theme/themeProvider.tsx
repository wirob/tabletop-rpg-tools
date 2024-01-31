'use client'

import type { PropsWithChildren } from 'react'
import {
  ChakraProvider,
  cookieStorageManagerSSR,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        minHeight: '100vh',
        padding: 0,
        margin: 0,
      },
    },
  },
})

export function ThemeProvider({
  cookies,
  children,
}: PropsWithChildren<{ cookies: string }>): JSX.Element {
  const colorModeManager = cookieStorageManagerSSR(cookies)

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  )
}
