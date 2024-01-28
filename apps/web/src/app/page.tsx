import Actions from './components/actions'
import styles from './page.module.css'

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <Actions />
    </main>
  )
}
