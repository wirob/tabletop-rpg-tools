'use client'

import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import {
  Button,
  Box,
  Center,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Stat,
  StatNumber,
  StatLabel,
} from '@repo/ui/chakra'
import { useToolsVisibility } from '@/app/context/toolsVisibilityContext'
import HealthSettings from './healthSettings'

type HandleHealthChange = (health: number) => void
type HandleButtonClick = (hp: number) => void
type HandleSetHealthMax = (val: number) => void
type HandleFullHealthClick = () => void

function HealthPoints(): JSX.Element | null {
  const [currentHealth, setCurrentHealth] = useLocalStorage('userHealth', 0)
  const [healthMax, setHealthMax] = useLocalStorage('userHealthMax', 0)
  const [healthToSet, setHealthToSet] = useState(0)
  const { toolsVisibility } = useToolsVisibility()

  const handleHealthChange: HandleHealthChange = (health) => {
    if (!Number.isInteger(health)) {
      setHealthToSet(0)
      return
    }

    setHealthToSet(health)
  }

  const handleButtonClick: HandleButtonClick = (hp) => {
    setCurrentHealth(currentHealth + hp)
    setHealthToSet(0)
  }

  const handleSetHealthMax: HandleSetHealthMax = (val) => {
    setHealthMax(val)
  }

  const handleFullHealthClick: HandleFullHealthClick = () => {
    setCurrentHealth(healthMax)
  }


  if (!toolsVisibility.health) return null

  return (
    <SimpleGrid className="mt-4" columns={3} spacing={2}>
      <Stat>
        <StatNumber>
          {currentHealth} / {healthMax}
        </StatNumber>
        <StatLabel>Health</StatLabel>
      </Stat>
      <Box flex="1">
        <HealthSettings
          healthMax={healthMax}
          setHealthMax={handleSetHealthMax}
        />
      </Box>

      <Center>
        <NumberInput
          inputMode="numeric"
          maxW={20}
          min={0}
          onChange={(_, valueAsNumber) => {
            handleHealthChange(valueAsNumber)
          }}
          size="lg"
          step={1}
          value={healthToSet}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Center>
      <Button
        colorScheme="green"
        onClick={() => {
          handleButtonClick(healthToSet)
        }}
        size="xs"
      >
        Heal
      </Button>
      <Button
        colorScheme="red"
        onClick={() => {
          handleButtonClick(-healthToSet)
        }}
        size="xs"
      >
        Damage
      </Button>
        <Flex>
          <Button onClick={handleFullHealthClick} width={48}>
            Full heal
          </Button>
        </Flex>
  )
}

export default HealthPoints
