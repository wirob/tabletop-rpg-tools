type SettingNames = 'health' | 'experience' | 'conditions'

interface Settings {
  health: HealthSettings
  experience: ExperienceSettings
  conditions: ConditionsSettings
}

interface HealthSettings {
  max: number
}

interface ExperienceSettings {
  increment?: number
}
