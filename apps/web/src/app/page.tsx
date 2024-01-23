'use client'

import { useEffect, useState } from 'react'
import { DoubleAction } from '@repo/ui/doubleAction'
import { FreeAction } from '@repo/ui/freeAction'
import { SingleAction } from '@repo/ui/singleAction'
import { TripleAction } from '@repo/ui/tripleAction'
import { Reaction } from '@repo/ui/reaction'
import styles from './page.module.css'

enum Action {
  Free = 'free',
  Single = 'single',
  Double = 'double',
  Triple = 'triple',
  Reaction = 'reaction',
}

type Actions = {
  [key in Action]: boolean
}

export default function Page(): JSX.Element {
  const [count, setCount] = useState(0)
  const [actions, setActions] = useState<Actions>({
    free: false,
    single: false,
    double: false,
    triple: false,
    reaction: false,
  })

  const handleCount = (cost: number) => {
    setCount(count + cost)
  }

  const handleClick = (cost: number, action: Action) => {
    console.log(cost, ' ', action)
    handleCount(cost)
    if (!actions[action]) {
      setActions({ ...actions, [action]: true })
    }
  }

  useEffect(() => {
    console.log(`actions taken are:`, actions)
  }, [actions])

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
        <DoubleAction
          disabled={actions.double}
          onClick={() => {
            handleClick(2, Action.Double)
          }}
        />
        <TripleAction />
        <Reaction />

        <h1 className="text-3xl font-bold underline text-white">
          Hello world!
        </h1>
      </div>
    </main>
  )
}
