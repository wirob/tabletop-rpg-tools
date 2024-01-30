import Actions from './components/actions'
import Experience from './components/experience'
import HealthPoints from './components/healthPoints'
import Notes from './components/notes'

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <Actions />
      <Experience />
      <HealthPoints />
      <Notes />
    </main>
  )
}
