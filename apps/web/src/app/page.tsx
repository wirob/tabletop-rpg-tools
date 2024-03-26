'use client'

import { Flex } from '@repo/ui/chakra'
import Actions from '@/components/actions'
import Conditions from '@/components/conditions'
import Experience from '@/components/experience'
import HealthPoints from '@/components/health/healthPoints'
import Notes from '@/components/notes'
import SideBar from '@/components/sideBar'

export default function Page(): JSX.Element {
  return (
    <main>
      <Flex align="center" direction="column">
        <SideBar />
        <Actions />
        <Experience />
        <HealthPoints />
        <Conditions />
        <Notes />
      </Flex>
    </main>
  )
}
