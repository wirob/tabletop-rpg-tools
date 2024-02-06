'use client'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  SettingsIcon,
  Spacer,
  Switch,
  useColorMode,
  useDisclosure,
  MoonIcon,
  SunIcon,
} from '@repo/ui/chakra'
import { useToolsVisibility } from '@/context/toolsVisibilityContext'

function SideBar(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const { toolsVisibility, setToolsVisibility } = useToolsVisibility()

  const handleChange: (name: ToolNames, value: boolean) => void = (
    name: ToolNames,
    value: boolean
  ) => {
    setToolsVisibility(name, value)
  }

  return (
    <>
      <div className="fixed top-0 left-0">
        <IconButton
          aria-label="open settings"
          icon={<SettingsIcon />}
          onClick={onOpen}
        />
      </div>

      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Toggle tools visibility</DrawerHeader>

          <DrawerBody>
            <FormControl>
              <Flex>
                <FormLabel htmlFor="actions-tool">Actions</FormLabel>
                <Spacer />
                <Switch
                  id="actions-tool"
                  isChecked={toolsVisibility.actions}
                  onChange={(event) => {
                    handleChange('actions', event.currentTarget.checked)
                  }}
                />
              </Flex>
              <Flex>
                <FormLabel htmlFor="experience-tool">Experience</FormLabel>
                <Spacer />
                <Switch
                  id="experience-tool"
                  isChecked={toolsVisibility.experience}
                  onChange={(event) => {
                    handleChange('experience', event.currentTarget.checked)
                  }}
                />
              </Flex>
              <Flex>
                <FormLabel htmlFor="health-tool">Health</FormLabel>
                <Spacer />
                <Switch
                  id="health-tool"
                  isChecked={toolsVisibility.health}
                  onChange={(event) => {
                    handleChange('health', event.currentTarget.checked)
                  }}
                />
              </Flex>
              <Flex>
                <FormLabel htmlFor="notes-tool">Notes</FormLabel>
                <Spacer />
                <Switch
                  id="notes-tool"
                  isChecked={toolsVisibility.notes}
                  onChange={(event) => {
                    handleChange('notes', event.currentTarget.checked)
                  }}
                />
              </Flex>
            </FormControl>
          </DrawerBody>
          <DrawerFooter>
            <Button
              aria-label="toggle color mode"
              leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            >
              Toggle {colorMode === 'light' ? 'Dark' : 'Light'} theme
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideBar
