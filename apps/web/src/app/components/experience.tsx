'use client'

import {
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from '@repo/ui/chakra'
import { useEffect, useState } from 'react'

const getExpFromLS: () => number | false = () => {
  const item = localStorage.getItem('userExp')

  if (item !== null) return Number(item)
  return false
}

export default function Experience(): JSX.Element {
  const maxExp = 999

  const [expButtonText, setExpButtonText] = useState('Add exp')
  const [currentExp, setCurrentExp] = useState(getExpFromLS() || 0)
  const [invalidInput, setInvalidInput] = useState(false)
  const [expToSet, setExpToSet] = useState(0)

  const handleChange: (exp: number) => void = (exp) => {
    setExpToSet(exp)

    if (exp <= maxExp) {
      setInvalidInput(false)
    }
  }

  useEffect(() => {
    if (expToSet < 0) setExpButtonText('Remove exp')
    else setExpButtonText('Add exp')
  }, [expToSet])

  useEffect(() => {
    localStorage.setItem('userExp', JSON.stringify(currentExp))
  }, [currentExp])

  const handleOnInvalid: () => void = () => {
    setInvalidInput(true)
  }

  const handleAddExp: () => void = () => {
    setCurrentExp(currentExp + expToSet)
  }

  return (
    <SimpleGrid className="mt-4" columns={3} spacing={2}>
      <Stat>
        <StatNumber>{currentExp}</StatNumber>
        <StatLabel>EXP</StatLabel>
      </Stat>
      <Stack>
        <NumberInput
          inputMode="numeric"
          max={maxExp}
          maxW={20}
          onChange={(valueAsString, valueAsNumber) => {
            handleChange(valueAsNumber)
          }}
          onInvalid={() => {
            handleOnInvalid()
          }}
          size="xs"
          step={10}
          keepWithinRange={false}
          clampValueOnBlur={false}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Stack>

      <Button
        size="xs"
        colorScheme="green"
        isDisabled={invalidInput}
        onClick={() => {
          handleAddExp()
        }}
      >
        {expButtonText}
      </Button>
    </SimpleGrid>
  )
}
