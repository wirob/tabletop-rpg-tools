import Actions from './components/actions'
import Experience from './components/experience'
import styles from './page.module.css'

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <Actions />
      <Experience />
    </main>
  )
}
