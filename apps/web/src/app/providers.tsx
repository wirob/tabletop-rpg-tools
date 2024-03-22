import { ThemeProvider } from '@repo/ui/theme'
import { cookies } from 'next/headers'
import { ToolsVisibilityProvider } from '@/app/context/toolsVisibilityContext'
import { ComponentSettingsProvider } from '@/app/context/componentSettingsContext'

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
      <ComponentSettingsProvider>
        <ToolsVisibilityProvider>{children}</ToolsVisibilityProvider>
      </ComponentSettingsProvider>
    </ThemeProvider>
  )
}
