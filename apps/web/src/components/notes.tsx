'use client'

import { Box, Textarea } from '@repo/ui/chakra'
import { useLocalStorage } from 'usehooks-ts'
import { useToolsVisibility } from '@/app/context/toolsVisibilityContext'

type HandleInputChange = (text: string) => void

function Notes(): JSX.Element | null {
  const [notes, setNotes] = useLocalStorage('notes', '')
  const { toolsVisibility } = useToolsVisibility()

  const handleInputChange: HandleInputChange = (text: string) => {
    setNotes(text)
  }

  if (!toolsVisibility.notes) return null
  return (
    <Box marginTop={4}>
      <Textarea
        onChange={(event) => {
          handleInputChange(event.target.value)
        }}
        value={notes}
      />
    </Box>
  )
}

export default Notes
