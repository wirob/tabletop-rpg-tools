type SettingNames = 'health' | 'experience'

interface Settings {
  health: HealthSettings
  experience: ExperienceSettings
}

interface HealthSettings {
  max: number
}

interface ExperienceSettings {
  increment: number
}
