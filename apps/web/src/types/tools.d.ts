type ToolNames = 'health' | 'notes' | 'experience' | 'actions' | 'conditions'

type ToolsVisibility = { [keyof in ToolNames]: boolean }
