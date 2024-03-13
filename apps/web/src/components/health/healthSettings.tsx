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
import { useEffect, useState } from 'react'

interface HealthSettingsProps {
  healthMax: number
  setCurrentHealth: (hp: number) => void
  setHealthMax: (hp: number) => void
  setTempHealth: (hp: number) => void
  tempHealth: number
}

type HandleChange = (
  val: number,
  setValueCallback: (val: number) => void
) => void
type HandleSave = () => void

function HealthSettings(props: HealthSettingsProps): JSX.Element {
  const {
    healthMax,
    setCurrentHealth,
    setHealthMax,
    setTempHealth,
    tempHealth,
  } = props
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [newHealthMax, setNewHealthMax] = useState(healthMax)
  const [newTempHealth, setNewTempHealth] = useState(tempHealth)

  useEffect(() => {
    setNewHealthMax(healthMax)
  }, [healthMax])

  useEffect(() => {
    setNewTempHealth(tempHealth)
  }, [tempHealth])

  const handleChange: HandleChange = (val, setValueCallback) => {
    if (isNaN(val) || !Number.isInteger(val)) {
      setValueCallback(0)
      return
    }

    setValueCallback(val)
  }

  const handleSave: HandleSave = () => {
    setHealthMax(newHealthMax)
    setTempHealth(newTempHealth)

    if (healthMax === 0) setCurrentHealth(newHealthMax)
    if (newHealthMax < healthMax) setCurrentHealth(newHealthMax)

    onToggle()
  }

  return (
    <Popover isOpen={isOpen} onClose={onClose} placement="right-start">
      <PopoverTrigger>
        <IconButton
          aria-label="health settings"
          isRound
          onClick={onToggle}
          size="xs"
        >
          <SettingsIcon />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <FormControl>
            <FormLabel>Max HP</FormLabel>
            <NumberInput
              min={0}
              onChange={(_, valAsNumber) => {
                handleChange(valAsNumber, setNewHealthMax)
              }}
              value={newHealthMax}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormLabel>Temp HP</FormLabel>
            <NumberInput
              min={0}
              onChange={(_, valAsNumber) => {
                handleChange(valAsNumber, setNewTempHealth)
              }}
              value={newTempHealth}
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
            <Button colorScheme="green" onClick={handleSave}>
              Save
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default HealthSettings
