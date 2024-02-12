import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  SettingsIcon,
  useDisclosure,
} from '@repo/ui/chakra'
import { useState } from 'react'

interface HealthSettingsProps {
  healthMax: number
  setHealthMax: (max: number) => void
}

function HealthSettings(props: HealthSettingsProps): JSX.Element {
  const { healthMax, setHealthMax } = props
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [newHealthMax, setNewHealthMax] = useState(healthMax)
  const [invalid, setInvalid] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const handleChange: (val: number) => void = (val) => {
    if (isNaN(val) || !Number.isInteger(val)) {
      setInvalid(true)
      setDisabled(true)
      return
    }

    setInvalid(false)
    setDisabled(false)
    setNewHealthMax(val)
  }

  const handleSave: () => void = () => {
    setHealthMax(newHealthMax)
    onToggle()
  }

  return (
    <Popover isOpen={isOpen} onClose={onClose} placement="right">
      <PopoverTrigger>
        <IconButton aria-label="health settings" onClick={onToggle} size="xs">
          <SettingsIcon />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <FormControl>
            <FormLabel>Max HP</FormLabel>
            <NumberInput
              isInvalid={invalid}
              min={1}
              onChange={(_, valAsNumber) => {
                handleChange(valAsNumber)
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </PopoverBody>
        <PopoverFooter>
          <ButtonGroup>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              colorScheme="green"
              isDisabled={disabled}
              onClick={handleSave}
            >
              Save
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default HealthSettings
