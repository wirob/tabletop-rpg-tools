'use client'

import { Textarea } from '@repo/ui/chakra'
import { useLocalStorage } from 'usehooks-ts'

type HandleInputChange = (text: string) => void

function Notes(): JSX.Element | null {
  const [notes, setNotes] = useLocalStorage('notes', '')
  const [toolsVisibility] = useLocalStorage<ToolsVisibility | undefined>(
    'toolsVisibility',
    undefined
  )

  const handleInputChange: HandleInputChange = (text: string) => {
    setNotes(text)
  }

  if (!toolsVisibility || !toolsVisibility.notes) return null
  return (
    <div className="mt-4">
      <Textarea
        onChange={(event) => {
          handleInputChange(event.target.value)
        }}
        value={notes}
      />
    </div>
  )
}

export default Notes
