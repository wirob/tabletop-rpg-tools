'use client'

import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
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
import { useToolsVisibility } from '@/app/context/toolsVisibilityContext'

export default function Experience(): JSX.Element | null {
  const maxExp = 999

  const [currentExp, setCurrentExp] = useLocalStorage('userExp', 0)
  const [invalidInput, setInvalidInput] = useState(true)
  const [expToSet, setExpToSet] = useState(0)
  const { toolsVisibility } = useToolsVisibility()

  const handleChange: (exp: number) => void = (exp) => {
    if (isNaN(exp)) {
      setInvalidInput(true)
      return
    }

    setExpToSet(exp)

    if (exp <= maxExp) {
      setInvalidInput(false)
    }
  }

  const handleOnInvalid: () => void = () => {
    setInvalidInput(true)
  }

  const handleAddExp: () => void = () => {
    setCurrentExp(currentExp + expToSet)
  }

  if (!toolsVisibility.experience) return null

  return (
    <SimpleGrid className="mt-4" columns={3} spacing={2}>
      <Stat>
        <StatNumber>{currentExp}</StatNumber>
        <StatLabel>EXP</StatLabel>
      </Stat>
      <Stack>
        <NumberInput
          clampValueOnBlur={false}
          inputMode="numeric"
          keepWithinRange={false}
          max={maxExp}
          maxW={20}
          onChange={(_, valueAsNumber) => {
            handleChange(valueAsNumber)
          }}
          onInvalid={() => {
            handleOnInvalid()
          }}
          size="xs"
          step={10}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Stack>

      <Button
        isDisabled={invalidInput}
        onClick={() => {
          handleAddExp()
        }}
      >
          Save
      </Button>
    </SimpleGrid>
  )
}
