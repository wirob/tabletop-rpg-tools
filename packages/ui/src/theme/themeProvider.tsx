'use client'

import type { PropsWithChildren } from 'react'
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({})

export function ThemeProvider(props: PropsWithChildren): JSX.Element {
  return <ChakraProvider theme={theme} {...props} />
}
