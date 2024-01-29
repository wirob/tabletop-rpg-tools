import Actions from './components/actions'
import Experience from './components/experience'
import HealthPoints from './components/healthPoints'
import styles from './page.module.css'

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <Actions />
      <Experience />
      <HealthPoints />
    </main>
  )
}
