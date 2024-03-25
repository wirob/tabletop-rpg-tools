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
  Tooltip,
  QuestionOutlineIcon,
} from '@repo/ui/chakra'
import { useState } from 'react'
import { useComponentSettings } from '@/app/context/componentSettingsContext'

type HandleChange = (setting: keyof ExperienceSettings, val: number) => void
type HandleSave = () => void

function ExpSettings(): JSX.Element {
  const { experienceSettings, setExperienceSettings } = useComponentSettings()
  const [experienceSettingsToSet, setExperienceSettingsToSet] =
    useState<ExperienceSettings>(experienceSettings)

  const handleChange: HandleChange = (setting, val) => {
    if (isNaN(val) || !Number.isInteger(val)) {
      setExperienceSettingsToSet((prev) => ({ ...prev, [setting]: undefined }))
      return
    }

    setExperienceSettingsToSet((prev) => ({ ...prev, [setting]: val }))
  }

  const handleSave: HandleSave = () => {
    setExperienceSettings(experienceSettingsToSet)
  }

  return (
    <AccordionItem>
      <Heading size="sm">
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Experience
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel>
        <FormControl>
          <Flex alignItems="end">
            <FormLabel>
              Incrementor
              <Tooltip
                aria-label="Set how much the '+' and '-' (including using the arrowkeys) will increment"
                hasArrow
                label="Set how much the '+' and '-' (including using the arrowkeys) will increment"
              >
                <QuestionOutlineIcon marginLeft={1} />
              </Tooltip>
            </FormLabel>

            <Spacer />
            <NumberInput
              maxWidth="100px"
              onBlur={handleSave}
              onChange={(_, valAsNumber) => {
                handleChange('increment', valAsNumber)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleSave()
              }}
              value={experienceSettingsToSet.increment}
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

export default ExpSettings
