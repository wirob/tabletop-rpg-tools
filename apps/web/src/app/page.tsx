import Actions from '@/components/actions'
import Conditions from '@/components/conditions'
import Experience from '@/components/experience'
import HealthPoints from '@/components/health/healthPoints'
import Notes from '@/components/notes'
import SideBar from '@/components/sideBar'

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <SideBar />
      <Actions />
      <Experience />
      <HealthPoints />
      <Conditions />
      <Notes />
    </main>
  )
}
