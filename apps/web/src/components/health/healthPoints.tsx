'use client'

import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stat,
  StatNumber,
  StatLabel,
} from '@repo/ui/chakra'
import { useToolsVisibility } from '@/app/context/toolsVisibilityContext'
import HealthSettings from './healthSettings'
import HealthBar from './healthBar'

type HandleHealthChange = (health: number) => void
type HandleButtonClick = (hp: number) => void
type HandleSetHealthMax = (val: number) => void
type HandleFullHealthClick = () => void

function HealthPoints(): JSX.Element | null {
  const [currentHealth, setCurrentHealth] = useLocalStorage('userHealth', 0)
  const [healthMax, setHealthMax] = useLocalStorage('userHealthMax', 0)
  const [healthToSet, setHealthToSet] = useState(0)
  const [healthPercentage, setHealthPercentage] = useState(0)
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

  useEffect(() => {
    setHealthPercentage((currentHealth / healthMax) * 100)
  }, [healthMax, currentHealth])

  if (!toolsVisibility.health) return null

  return (
    <Grid gap={4} margin={8} templateColumns="repeat(2, 1fr)">
      {/* current health */}
      <GridItem>
        <Flex h="100%" justifyContent="space-between">
          <Box>
            <Stat>
              <StatNumber>
                {currentHealth} / {healthMax}
              </StatNumber>
              <StatLabel>Health</StatLabel>
            </Stat>
          </Box>
          <HealthSettings
            healthMax={healthMax}
            setHealthMax={handleSetHealthMax}
          />
          <HealthBar health={healthPercentage} temp={tempHealthPercentage} />
        </Flex>
      </GridItem>

      {/* input field */}
      <GridItem>
        <Flex gap={2}>
          <NumberInput
            inputMode="numeric"
            min={0}
            onChange={(_, valueAsNumber) => {
              handleHealthChange(valueAsNumber)
            }}
            size="lg"
            step={1}
            value={healthToSet}
            width={48}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>

        {/* buttons */}
        <Flex
          gap={2}
          justifyContent="space-between"
          marginBottom={2}
          marginTop={2}
        >
          <Button
            colorScheme="green"
            onClick={() => {
              handleButtonClick(healthToSet)
            }}
            width="50%"
          >
            Heal
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              handleButtonClick(-healthToSet)
            }}
            width="50%"
          >
            Damage
          </Button>
        </Flex>
        <Flex>
          <Button onClick={handleFullHealthClick} width={48}>
            Full heal
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default HealthPoints
