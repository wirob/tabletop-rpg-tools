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

type ExpButtonText = 'Add exp' | 'Remove exp'

export default function Experience(): JSX.Element {
  const maxExp = 999

  const [expButtonText, setExpButtonText] = useState<ExpButtonText>('Add exp')
  const [currentExp, setCurrentExp] = useLocalStorage('userExp', 0)
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
        colorScheme="green"
        isDisabled={invalidInput}
        onClick={() => {
          handleAddExp()
        }}
        size="xs"
      >
        {expButtonText}
      </Button>
    </SimpleGrid>
  )
}
