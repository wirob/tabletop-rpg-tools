'use client'

import {
  Drawer,
  DrawerBody,
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
  useDisclosure,
} from '@repo/ui/chakra'
import { useLocalStorage } from 'usehooks-ts'

type ToolNames = 'health' | 'notes' | 'experience'

type ToolsVisibility = { [keyof in ToolNames]: boolean }

function SideBar(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [toolsVisibility, setToolsVisibility] =
    useLocalStorage<ToolsVisibility>('toolsVisibility', {
      health: true,
      notes: true,
      experience: true,
    })

  const handleChange: (name: ToolNames, value: boolean) => void = (
    name: string,
    value: boolean
  ) => {
    setToolsVisibility((prev) => ({ ...prev, [name]: value }))
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
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideBar
