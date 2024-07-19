'use client'

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@repo/ui/chakra'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useToolsVisibility } from '@/app/context/toolsVisibilityContext'
import { useComponentSettings } from '@/app/context/componentSettingsContext'
import pathfinderConditions from './pathfinderConditions'
import dnd5eConditions from './dnd5eConditions'

type HandleChange = (val: PathFinderConditions | undefined) => void
type PathFinderConditions = (typeof pathfinderConditions)[number]
type HandleRemoveCondition = (condition: PathFinderConditions) => void

function selectConditionsSourceToUse(selected: ConditionsSources): string[] {
  switch (selected) {
    case 'pathfinder':
      return pathfinderConditions

    case 'dnd5e':
      return dnd5eConditions

    default:
      throw new Error('Not a valid source')
  }
}

function Conditions(): JSX.Element | null {
  const { toolsVisibility } = useToolsVisibility()
  const { conditionsSettings } = useComponentSettings()
  const [selectableConditions, setSelectableConditions] = useState<string[]>(
    selectConditionsSourceToUse(conditionsSettings.source)
  )
  const [currentConditions, setCurrentConditions] = useLocalStorage<string[]>(
    `userConditions${conditionsSettings.source}`,
    []
  )

  useEffect(() => {
    setSelectableConditions(
      selectConditionsSourceToUse(conditionsSettings.source)
    )
  }, [conditionsSettings.source, setCurrentConditions])

  useEffect(() => {
    setSelectableConditions((prev) => {
      return prev.filter((c) => !currentConditions.includes(c))
    })
  }, [currentConditions])

  const handleChange: HandleChange = (val) => {
    // Placeholder select can be undefined
    if (!val) return

    setCurrentConditions((prev) => [...prev, val])
  }

  const handleRemoveCondition: HandleRemoveCondition = (condition) => {
    setCurrentConditions((prev) => prev.filter((c) => c !== condition))
    setSelectableConditions((prev) => [...prev, condition].sort())
  }

  if (!toolsVisibility.conditions) return null

  return (
    <Box maxW="400px" w="400px">
      <Grid gap={2} templateColumns="repeat(2, 1fr)">
        <GridItem>
          <Select
            marginBottom={2}
            onChange={(event) => {
              handleChange(event.currentTarget.value)
            }}
            placeholder="Select condition"
            w="200px"
          >
            {selectableConditions.map((condition) => (
              <option key={`pf-${condition}`} value={condition}>
                {condition}
              </option>
            ))}
          </Select>
        </GridItem>
      </Grid>
      {currentConditions.length > 0 ? (
        <Flex gap={4} wrap="wrap">
          {currentConditions.map((condition) => (
            <Tag key={condition} size="lg">
              <TagLabel>{condition}</TagLabel>
              <TagCloseButton
                onClick={() => {
                  handleRemoveCondition(condition)
                }}
              />
            </Tag>
          ))}
        </Flex>
      ) : null}
    </Box>
  )
}

export default Conditions
