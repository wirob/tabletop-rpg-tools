'use client'

import { useEffect, useState } from 'react'
import {
  FreeAction as FreeActionIcon,
  SingleAction as SingleActionIcon,
  TripleAction as TripleActionIcon,
  Reaction as ReactionIcon,
  DoubleAction as DoubleActionIcon,
} from '@repo/ui/icons'
import { Button } from '@repo/ui/chakra'
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
    handleCount(cost)
    if (!actions[action]) {
      setActions({ ...actions, [action]: true })
    }
  }

  const handleReset: () => void = () => {
    setActions({
      free: false,
      single: false,
      double: false,
      triple: false,
      reaction: false,
    })
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
        <IconButton
          aria-label="free action"
          icon={<FreeActionIcon />}
          isDisabled={actions.free}
          onClick={() => {
            handleClick('free', 0)
          }}
        />

        <IconButton
          aria-label="single action"
          icon={<SingleActionIcon />}
          isDisabled={actions.single}
          onClick={() => {
            handleClick('single', 1)
          }}
        />

        <IconButton
          aria-label="double action"
          icon={<DoubleActionIcon />}
          isDisabled={actions.double}
          onClick={() => {
            handleClick('double', 2)
          }}
        />

        <IconButton
          aria-label="triple action"
          icon={<TripleActionIcon />}
          isDisabled={actions.triple}
          onClick={() => {
            handleClick('triple', 3)
          }}
        />

        <IconButton
          aria-label="reaction"
          icon={<ReactionIcon />}
          isDisabled={actions.reaction}
          onClick={() => {
            handleClick('reaction', 0)
          }}
        />

        <Button
          onClick={() => {
            handleReset()
          }}
        >
          Reset
        </Button>
      </div>
    </main>
  )
}
