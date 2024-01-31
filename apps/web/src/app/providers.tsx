import { ThemeProvider } from '@repo/ui/theme'
import { cookies } from 'next/headers'

export function Providers({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const chakraCookie = cookies().get('chakra-ui-color-mode')

  return (
    <ThemeProvider
      cookies={chakraCookie ? `chakra-ui-color-mode=${chakraCookie.value}` : ''}
    >
      {children}
    </ThemeProvider>
  )
}
