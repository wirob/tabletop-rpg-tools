type ToolNames = 'health' | 'notes' | 'experience' | 'actions'

type ToolsVisibility = { [keyof in ToolNames]: boolean }
