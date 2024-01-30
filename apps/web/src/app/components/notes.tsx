'use client'

import { Textarea } from '@repo/ui/chakra'
import { useLocalStorage } from 'usehooks-ts'

type HandleInputChange = (text: string) => void

function Notes(): JSX.Element {
  const [notes, setNotes] = useLocalStorage('notes', '')

  const handleInputChange: HandleInputChange = (text: string) => {
    setNotes(text)
  }

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
