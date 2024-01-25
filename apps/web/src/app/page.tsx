'use client'

import { useEffect, useState } from 'react'
import {
  FreeAction as FreeActionIcon,
  SingleAction as SingleActionIcon,
  TripleAction as TripleActionIcon,
  Reaction as ReactionIcon,
} from '@repo/ui/icons'
import { DoubleActionButton } from '@repo/ui/doubleAction'
import { ActionButton } from './components/actionButtons'
import styles from './page.module.css'

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

  const handleClick: (action: Action, cost: number) => void = (
    action,
    cost
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
        <ActionButton
          disabled={actions.free}
          label="free action"
          onClick={() => {
            handleClick('free', 0)
          }}
        >
          <FreeActionIcon />
        </ActionButton>

        <SingleActionIcon />
        <DoubleActionButton
          disabled={actions.double}
          onClick={() => {
            handleClick('double', 2)
          }}
        />
        <TripleActionIcon />
        <ReactionIcon />
      </div>
    </main>
  )
}
