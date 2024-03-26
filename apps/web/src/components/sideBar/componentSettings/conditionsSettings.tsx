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
  Spacer,
  Tooltip,
  QuestionOutlineIcon,
  Select,
} from '@repo/ui/chakra'
import { useComponentSettings } from '@/app/context/componentSettingsContext'

type HandleChange = (
  setting: keyof ConditionsSettings,
  val: ConditionsSources
) => void

interface Source {
  name: 'Pathfinder' | 'DnD 5e'
  source: ConditionsSources
}

type Sources = Source[]

const sources: Sources = [
  { name: 'Pathfinder', source: 'pathfinder' },
  { name: 'DnD 5e', source: 'dnd5e' },
]

function ConditionsSettings(): JSX.Element {
  const { conditionsSettings, setConditionsSettings } = useComponentSettings()

  const handleChange: HandleChange = (setting, val) => {
    setConditionsSettings({ ...conditionsSettings, [setting]: val })
  }

  return (
    <AccordionItem>
      <Heading size="sm">
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Conditions
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel>
        <FormControl>
          <Flex alignItems="end">
            <FormLabel>
              Conditions
              <Tooltip
                aria-label="Set which source of conditions to use"
                hasArrow
                label="Set which source of conditions to use"
              >
                <QuestionOutlineIcon marginLeft={1} />
              </Tooltip>
            </FormLabel>
            <Spacer />
            <Select
              maxWidth="140px"
              onChange={(event) => {
                const val = event.currentTarget.value as ConditionsSources
                handleChange('source', val)
              }}
              value={conditionsSettings.source}
            >
              {sources.map((source) => (
                <option key={source.source} value={source.source}>
                  {source.name}
                </option>
              ))}
            </Select>
          </Flex>
        </FormControl>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default ConditionsSettings
