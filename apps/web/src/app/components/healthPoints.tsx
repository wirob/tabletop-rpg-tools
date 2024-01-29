'use client'

import { useState, useEffect } from 'react'
import {
  Button,
  Box,
  Center,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SettingsIcon,
  SimpleGrid,
  Stat,
  StatNumber,
  StatLabel,
} from '@repo/ui/chakra'

type HandleHealthChange = (health: number) => void
type HandleButtonClick = (hp: number) => void
type GetHealthFromLS = () => number | false

const getHealthFromLS: GetHealthFromLS = () => {
  const item = localStorage.getItem('userHealth')

  if (item !== null) return Number(item)
  return false
}

function HealthPoints(): JSX.Element {
  const [currentHealth, setCurrentHealth] = useState(getHealthFromLS() || 0)
  const [healthToSet, setHealthToSet] = useState(0)

  const handleHealthChange: HandleHealthChange = (health) => {
    setHealthToSet(health)
  }

  const handleButtonClick: HandleButtonClick = (hp) => {
    setCurrentHealth(currentHealth + hp)
    setHealthToSet(0)
  }

  useEffect(() => {
    localStorage.setItem('userHealth', JSON.stringify(currentHealth))
  }, [currentHealth])

  return (
    <SimpleGrid className="mt-4" columns={3} spacing={2}>
      <Stat>
        <StatNumber>{currentHealth} / max</StatNumber>
        <StatLabel>Health</StatLabel>
      </Stat>
      <Box flex="1">
        <IconButton aria-label="health settings" size="xs">
          <SettingsIcon />
        </IconButton>
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
    </SimpleGrid>
  )
}

export default HealthPoints
