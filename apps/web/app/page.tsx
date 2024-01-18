import styles from './page.module.css'
// import { Actions } from '@repo/actions'
import {
  DoubleAction,
  FreeAction,
  Reaction,
  SingleAction,
  TripleAction,
} from '@repo/ui'

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FreeAction />
        <SingleAction />
        <DoubleAction />
        <TripleAction />
        <Reaction />
      </div>
    </main>
  )
}
