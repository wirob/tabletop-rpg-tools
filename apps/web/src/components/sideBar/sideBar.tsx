'use client'

import {
  Accordion,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  SettingsIcon,
  useColorMode,
  useDisclosure,
  MoonIcon,
  SunIcon,
  Box,
} from '@repo/ui/chakra'
import ToolsVisibility from './toolsVisibility'
import ComponentSettings from './componentSettings'

function SideBar(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Box left={0} position="fixed" top={0}>
        <IconButton
          aria-label="open settings"
          icon={<SettingsIcon />}
          onClick={onOpen}
        />
      </Box>

      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>
          <DrawerBody>
            <Accordion allowMultiple>
              <ToolsVisibility />
              <ComponentSettings />
            </Accordion>
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
