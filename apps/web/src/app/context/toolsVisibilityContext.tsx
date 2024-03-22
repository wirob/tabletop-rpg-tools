'use client'

import { createContext, useContext, type PropsWithChildren } from 'react'
import { useLocalStorage } from 'usehooks-ts'

interface ToolsVisibilityContextType {
  toolsVisibility: ToolsVisibility
  setToolsVisibility: (name: ToolNames, value: boolean) => void
}

const ToolsVisibilityContext = createContext<ToolsVisibilityContextType | null>(
  null
)

export function ToolsVisibilityProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [toolsVisibility, setToolsVisibility] =
    useLocalStorage<ToolsVisibility>('toolsVisibility', {
      actions: true,
      experience: true,
      health: true,
      conditions: true,
      notes: true,
    })

  const handleChange: (name: ToolNames, value: boolean) => void = (
    name: string,
    value: boolean
  ) => {
    setToolsVisibility((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <ToolsVisibilityContext.Provider
      value={{ toolsVisibility, setToolsVisibility: handleChange }}
    >
      {children}
    </ToolsVisibilityContext.Provider>
  )
}

export function useToolsVisibility(): ToolsVisibilityContextType {
  const context = useContext(ToolsVisibilityContext)

  if (!context)
    throw new Error(
      'useToolsVisibility has to be used within <ToolsVisibilityProvider.Provider>'
    )

  return context
}
