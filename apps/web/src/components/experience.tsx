'use client'

import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from '@repo/ui/chakra'
import { useToolsVisibility } from '@/app/context/toolsVisibilityContext'

export default function Experience(): JSX.Element | null {
  const [currentExp, setCurrentExp] = useLocalStorage('userExp', 0)
  const [invalidInput, setInvalidInput] = useState(true)
  const [expToSet, setExpToSet] = useState(0)
  const { toolsVisibility } = useToolsVisibility()

  const handleChange: (exp: number) => void = (exp) => {
    if (isNaN(exp)) setExpToSet(0)
    else setExpToSet(exp)
  }

  const handleAddExp: () => void = () => {
    if (!expToSet) return

    setCurrentExp(currentExp + expToSet)
    setExpToSet(0)
  }

  useEffect(() => {
    if (expToSet === 0) setInvalidInput(true)
    else setInvalidInput(false)
  }, [setInvalidInput, expToSet])

  if (!toolsVisibility.experience) return null

  return (
    <Grid gap={6} marginTop={8} templateColumns="repeat(3, 1fr)">
      <GridItem>
        <Flex justifyContent="end">
          <Box>
            <Stat>
              <StatNumber>{currentExp}</StatNumber>
              <StatLabel>EXP</StatLabel>
            </Stat>
          </Box>
        </Flex>
      </GridItem>
      <GridItem>
        <Stack>
          <NumberInput
            clampValueOnBlur={false}
            inputMode="numeric"
            keepWithinRange={false}
            maxW={24}
            onChange={(_, valueAsNumber) => {
              handleChange(valueAsNumber)
            }}
            size="md"
            step={10}
            value={expToSet}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper>+</NumberIncrementStepper>
              <NumberDecrementStepper>-</NumberDecrementStepper>
            </NumberInputStepper>
          </NumberInput>
        </Stack>
      </GridItem>
      <GridItem>
        <Button
          isDisabled={invalidInput}
          onClick={() => {
            handleAddExp()
          }}
        >
          Save
        </Button>
      </GridItem>
    </Grid>
  )
}
