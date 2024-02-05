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
import { useToggle } from 'usehooks-ts'
import { useLocalStorage } from 'usehooks-ts'

function SideBar(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [healthToolVisibility, setHealthToolVisibility] = useLocalStorage(
    'healthToolVisibility',
    true
  )

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
                <Switch id="health-tool" />
              </Flex>
              <Flex>
                <FormLabel htmlFor="experience-tool">Experience</FormLabel>
                <Spacer />
                <Switch id="experience-tool" />
              </Flex>
              <Flex>
                <FormLabel htmlFor="notes-tool">Notes</FormLabel>
                <Spacer />
                <Switch id="notes-tool" />
              </Flex>
            </FormControl>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideBar
