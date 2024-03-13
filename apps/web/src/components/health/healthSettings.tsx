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
  setHealthMax: (hp: number) => void
  setTempHealth: (hp: number) => void
  tempHealth: number
}

type HandleChange = (
  val: number,
  onInvalidCallback: (val: boolean) => void,
  setValueCallback: (val: number) => void
) => void
type HandleSave = () => void

function HealthSettings(props: HealthSettingsProps): JSX.Element {
  const { healthMax, setHealthMax, setTempHealth, tempHealth } = props
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [newHealthMax, setNewHealthMax] = useState(healthMax)
  const [newTempHealth, setNewTempHealth] = useState(tempHealth)
  const [maxHealthInvalid, setMaxHealthInvalid] = useState(false)
  const [tempHealthInvalid, setTempHealthInvalid] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setNewHealthMax(healthMax)
  }, [healthMax])

  useEffect(() => {
    setNewTempHealth(tempHealth)
  }, [tempHealth])

  const handleChange: HandleChange = (
    val,
    onInvalidCallback,
    setValueCallback
  ) => {
    if (isNaN(val) || !Number.isInteger(val)) {
      onInvalidCallback(true)
      setValueCallback(0)
      setDisabled(true)
      return
    }

    onInvalidCallback(false)
    setDisabled(false)
    setValueCallback(val)
  }

  const handleSave: HandleSave = () => {
    setHealthMax(newHealthMax)
    setTempHealth(newTempHealth)
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
              isInvalid={maxHealthInvalid}
              min={0}
              onChange={(_, valAsNumber) => {
                handleChange(valAsNumber, setMaxHealthInvalid, setNewHealthMax)
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
              isInvalid={tempHealthInvalid}
              min={0}
              onChange={(_, valAsNumber) => {
                handleChange(
                  valAsNumber,
                  setTempHealthInvalid,
                  setNewTempHealth
                )
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
