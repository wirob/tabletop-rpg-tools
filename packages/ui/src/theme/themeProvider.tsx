import type { PropsWithChildren } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({})

export function ThemeProvider(props: PropsWithChildren): JSX.Element {
  return <ChakraProvider theme={theme} {...props} />
}
