'use client'

import { useEffect, useState } from 'react'
import {
  FreeAction as FreeActionIcon,
  SingleAction as SingleActionIcon,
  TripleAction as TripleActionIcon,
  Reaction as ReactionIcon,
} from '@repo/ui/icons'
import { DoubleActionButton } from '@repo/ui/doubleAction'
import styles from './page.module.css'

type Action = 'free' |'single' |'double' |'triple' | 'reaction'

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

  const handleCount: (cost: number) => void = (cost) => {
    setCount(count + cost)
  }

  const handleClick: (cost: number, action: Action) => void = (
    cost,
    action
  ) => {
    // console.log(cost, ' ', action)
    handleCount(cost)
    if (!actions[action]) {
      setActions({ ...actions, [action]: true })
    }
  }

  useEffect(() => {
    // console.log(`actions taken are:`, actions)
  }, [actions])

  return (
    <main className={styles.main}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FreeActionIcon />
        <SingleActionIcon />
        <DoubleActionButton
          disabled={actions.double}
          onClick={() => {
            handleClick(2, 'double')
          }}
        />
        <TripleActionIcon />
        <ReactionIcon />

        <h1 className="text-3xl font-bold underline text-slate-500">
          Hello world!
        </h1>
      </div>
    </main>
  )
}
