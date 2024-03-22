'use client'

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
} from '@repo/ui/chakra'
import { useState } from 'react'
import { useComponentSettings } from '@/app/context/componentSettingsContext'

type HandleChange = (setting: keyof HealthSettings, val: number) => void
type HandleSave = () => void

function HealthSettings(): JSX.Element {
  const { healthSettings, setHealthSettings } = useComponentSettings()
  const [healthSettingsToSet, setHealthSettingsToSet] =
    useState<HealthSettings>(healthSettings)

  const handleChange: HandleChange = (setting, val) => {
    if (isNaN(val) || !Number.isInteger(val)) {
      setHealthSettingsToSet((prev) => ({ ...prev, [setting]: 0 }))
      return
    }

    setHealthSettingsToSet((prev) => ({ ...prev, [setting]: val }))
  }

  const handleSave: HandleSave = () => {
    setHealthSettings(healthSettingsToSet)
  }

  return (
    <AccordionItem>
      <Heading size="sm">
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Health
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel>
        <FormControl>
          <Flex alignItems="end">
            <FormLabel>Max Health</FormLabel>
            <Spacer />
            <NumberInput
              maxWidth="100px"
              min={0}
              onBlur={handleSave}
              onChange={(_, valAsNumber) => {
                handleChange('max', valAsNumber)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleSave()
              }}
              value={healthSettingsToSet.max}
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
        </FormControl>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default HealthSettings
