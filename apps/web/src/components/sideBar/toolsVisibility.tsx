import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Spacer,
  Switch,
} from '@repo/ui/chakra'
import { useToolsVisibility } from '@/app/context/toolsVisibilityContext'

function ToolsVisibility(): JSX.Element {
  const { toolsVisibility, setToolsVisibility } = useToolsVisibility()

  const handleChange: (name: ToolNames, value: boolean) => void = (
    name: ToolNames,
    value: boolean
  ) => {
    setToolsVisibility(name, value)
  }
  return (
    <AccordionItem>
      <Heading size="sm">
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Tools visibility
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel pb={4}>
        <FormControl>
          <Flex>
            <FormLabel>Actions</FormLabel>
            <Spacer />
            <Switch
              isChecked={toolsVisibility.actions}
              onChange={(event) => {
                handleChange('actions', event.currentTarget.checked)
              }}
            />
          </Flex>
        </FormControl>
        <FormControl>
          <Flex>
            <FormLabel>Experience</FormLabel>
            <Spacer />
            <Switch
              isChecked={toolsVisibility.experience}
              onChange={(event) => {
                handleChange('experience', event.currentTarget.checked)
              }}
            />
          </Flex>
        </FormControl>
        <FormControl>
          <Flex>
            <FormLabel>Health</FormLabel>
            <Spacer />
            <Switch
              isChecked={toolsVisibility.health}
              onChange={(event) => {
                handleChange('health', event.currentTarget.checked)
              }}
            />
          </Flex>
        </FormControl>
        <FormControl>
          <Flex>
            <FormLabel>Conditions</FormLabel>
            <Spacer />
            <Switch
              isChecked={toolsVisibility.conditions}
              onChange={(event) => {
                handleChange('conditions', event.currentTarget.checked)
              }}
            />
          </Flex>
        </FormControl>
        <FormControl>
          <Flex>
            <FormLabel>Notes</FormLabel>
            <Spacer />
            <Switch
              isChecked={toolsVisibility.notes}
              onChange={(event) => {
                handleChange('notes', event.currentTarget.checked)
              }}
            />
          </Flex>
        </FormControl>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default ToolsVisibility
