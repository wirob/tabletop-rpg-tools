'use client'

import { createContext, useContext, type PropsWithChildren } from 'react'
import { useLocalStorage } from 'usehooks-ts'

type HandleHealthChange = (health: HealthSettings) => void
type HandleExperienceChange = (experience: ExperienceSettings) => void
type HandleConditionsChange = (conditions: ConditionsSettings) => void

interface ComponentSettingsContextType {
  setHealthSettings: HandleHealthChange
  healthSettings: HealthSettings
  experienceSettings: ExperienceSettings
  setExperienceSettings: HandleExperienceChange
  conditionsSettings: ConditionsSettings
  setConditionsSettings: HandleConditionsChange
}

const ComponentSettingsContext =
  createContext<ComponentSettingsContextType | null>(null)

export function ComponentSettingsProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [componentSettings, setComponentSettings] = useLocalStorage<Settings>(
    'toolsSettings',
    {
      health: {
        max: 0,
      },
      experience: {
        increment: 10,
      },
      conditions: {
        source: 'pathfinder',
      },
    }
  )

  const handleHealthChange: HandleHealthChange = (health) => {
    setComponentSettings((prev) => ({ ...prev, health }))
  }

  const handleConditionsChange: HandleConditionsChange = (conditions) => {
    setComponentSettings((prev) => ({ ...prev, conditions }))
  }

  const handleExperienceChange: HandleExperienceChange = (experience) => {
    setComponentSettings((prev) => ({ ...prev, experience }))
  }

  return (
    <ComponentSettingsContext.Provider
      value={{
        healthSettings: componentSettings.health,
        setHealthSettings: handleHealthChange,
        experienceSettings: componentSettings.experience,
        setExperienceSettings: handleExperienceChange,
        conditionsSettings: componentSettings.conditions,
        setConditionsSettings: handleConditionsChange,
      }}
    >
      {children}
    </ComponentSettingsContext.Provider>
  )
}

export function useComponentSettings(): ComponentSettingsContextType {
  const context = useContext(ComponentSettingsContext)

  if (!context)
    throw new Error(
      'useComponentSettings has to be used within <ComponentSettingsProvider.Provider>'
    )

  return context
}
