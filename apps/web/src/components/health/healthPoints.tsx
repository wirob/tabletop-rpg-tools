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
  Spacer,
} from '@repo/ui/chakra'
import { useToolsVisibility } from '@/app/context/toolsVisibilityContext'
import { useComponentSettings } from '@/app/context/componentSettingsContext'
import HealthBar from './healthBar'

type HandleHealthChange = (health: number) => void
type HandleHeal = (hp: number) => void
type HandleDamage = (dmg: number) => void
type HandleFullHealthClick = () => void
type HandleTempHealthChange = (val: number) => void

function HealthPoints(): JSX.Element | null {
  const [currentHealth, setCurrentHealth] = useLocalStorage('userHealth', 0)
  const [tempHealth, setTempHealth] = useLocalStorage('userHealthTemp', 0)
  const [healthToSet, setHealthToSet] = useState(0)
  const [healthPercentage, setHealthPercentage] = useState(0)
  const [tempHealthPercentage, setTempHealthPercentage] = useState(0)
  const { toolsVisibility } = useToolsVisibility()
  const { healthSettings: health } = useComponentSettings()

  const handleHealthChange: HandleHealthChange = (hp) => {
    if (!Number.isInteger(hp)) {
      setHealthToSet(0)
      return
    }

    setHealthToSet(hp)
  }

  const handleHeal: HandleHeal = (hp) => {
    if (hp >= health.max) setCurrentHealth(health.max)
    else if (hp >= health.max - currentHealth) setCurrentHealth(health.max)
    else setCurrentHealth(currentHealth + hp)
    setHealthToSet(0)
  }

  const handleDamage: HandleDamage = (dmg) => {
    if (dmg > tempHealth) {
      setCurrentHealth(currentHealth + (tempHealth - dmg))
      setTempHealth(0)
    } else {
      setTempHealth(tempHealth - dmg)
    }

    setHealthToSet(0)
  }

  const handleFullHealthClick: HandleFullHealthClick = () => {
    setCurrentHealth(health.max)
  }

  const handleTempHealthChange: HandleTempHealthChange = (val) => {
    if (isNaN(val) || !Number.isInteger(val)) {
      setTempHealth(0)
      return
    }

    setTempHealth(val)
  }

  useEffect(() => {
    setHealthPercentage((currentHealth / health.max) * 100)
  }, [health.max, currentHealth])

  useEffect(() => {
    setTempHealthPercentage((tempHealth / health.max) * 100)
  }, [health.max, tempHealth])

  useEffect(() => {
    if (health.max < currentHealth) setCurrentHealth(health.max)
  }, [health.max, currentHealth, setCurrentHealth])

  if (!toolsVisibility.health) return null

  return (
    <Grid gap={4} margin={8} templateColumns="repeat(2, 1fr)">
      {/* current health */}
      <GridItem>
        <Flex h="100%">
          <Flex flexDirection="column" justifyContent="space-between">
            <Box>
              <Stat>
                <StatNumber>
                  {currentHealth} / {health.max}
                </StatNumber>
                <StatLabel>Health</StatLabel>
              </Stat>
            </Box>
            <Box>
              <Stat>
                <StatNumber>
                  <NumberInput
                    defaultValue={0}
                    inputMode="numeric"
                    max={999}
                    min={0}
                    onChange={(_, valueAsNumber) => {
                      handleTempHealthChange(valueAsNumber)
                    }}
                    size="lg"
                    value={tempHealth}
                    variant="outline"
                  >
                    <NumberInputField
                      fontSize="x-large"
                      onFocus={(event) => {
                        event.preventDefault()
                        event.target.select()
                      }}
                      paddingLeft={2}
                      paddingRight={0}
                      width="60px"
                    />
                  </NumberInput>
                </StatNumber>
                <StatLabel>Temp HP</StatLabel>
              </Stat>
            </Box>
          </Flex>
          <Spacer />
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
            <NumberInputField
              onFocus={(event) => {
                event.preventDefault()
                event.target.select()
              }}
            />
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
              handleHeal(healthToSet)
            }}
            width="50%"
          >
            Heal
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              handleDamage(healthToSet)
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
