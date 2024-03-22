'use client'

import {
  Box,
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
} from '@repo/ui/chakra'
import ToolsVisibility from './toolsVisibility'
import ComponentSettings from './componentSettings'

function SideBar(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

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
          <DrawerHeader>Settings</DrawerHeader>
          <DrawerBody>
            <Box>
              <ToolsVisibility />
              <ComponentSettings />
            </Box>
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
