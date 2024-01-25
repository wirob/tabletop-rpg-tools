import { ThemeProvider } from '@repo/ui/theme'

export function Providers({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return <ThemeProvider>{children}</ThemeProvider>
}
