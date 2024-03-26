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

interface ConditionsSettings {
  source: ConditionsSources
}

type Pathfinder = 'pathfinder'
type Dnd5e = 'dnd5e'

type ConditionsSources = Pathfinder | Dnd5e
