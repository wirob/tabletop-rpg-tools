'use client'

import type { PropsWithChildren } from 'react'
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'

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

export function ThemeProvider(props: PropsWithChildren): JSX.Element {
  return <ChakraProvider theme={theme} {...props} />
}
