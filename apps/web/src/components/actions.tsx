'use client'

import { useState } from 'react'
import {
  FreeAction as FreeActionIcon,
  SingleAction as SingleActionIcon,
  TripleAction as TripleActionIcon,
  Reaction as ReactionIcon,
  DoubleAction as DoubleActionIcon,
} from '@repo/ui/icons'
import { Button, Grid, GridItem, IconButton } from '@repo/ui/chakra'
import { useToolsVisibility } from '@/app/context/toolsVisibilityContext'

type ActionsAvailable = {
  [key in Action]: boolean
}

export default function Actions(): JSX.Element | null {
  const [actionsUsed, setActionsUsed] = useState(0)
  const [actions, setActions] = useState<ActionsAvailable>({
    free: false,
    single: false,
    double: false,
    triple: false,
    reaction: false,
  })
  const { toolsVisibility } = useToolsVisibility()

  const handleClick: (action: Action, cost: number) => void = (
    action,
    cost
  ) => {
    const actionsCost = actionsUsed + cost
    const actionsTaken = { ...actions }

    if (action === 'reaction') actionsTaken.reaction = true
    if (actionsCost >= 1) actionsTaken.triple = true
    if (actionsCost >= 2) actionsTaken.double = true
    if (actionsCost >= 3) actionsTaken.single = true

    setActionsUsed(actionsCost)
    setActions(actionsTaken)
  }

  const handleReset: () => void = () => {
    setActions({
      free: false,
      single: false,
      double: false,
      triple: false,
      reaction: false,
    })
    setActionsUsed(0)
  }

  if (!toolsVisibility.actions) return null

  return (
    <Grid gap={2} marginTop={4} templateColumns="repeat(6, 1fr)">
      <GridItem width="100%">
        <IconButton
          aria-label="free action"
          icon={<FreeActionIcon />}
          isDisabled={actions.free}
          onClick={() => {
            handleClick('free', 0)
          }}
          width="100%"
        />
      </GridItem>
      <GridItem width="100%">
        <IconButton
          aria-label="single action"
          icon={<SingleActionIcon />}
          isDisabled={actions.single}
          onClick={() => {
            handleClick('single', 1)
          }}
          width="100%"
        />
      </GridItem>
      <GridItem width="100%">
        <IconButton
          aria-label="double action"
          icon={<DoubleActionIcon />}
          isDisabled={actions.double}
          onClick={() => {
            handleClick('double', 2)
          }}
          width="100%"
        />
      </GridItem>
      <GridItem width="100%">
        <IconButton
          aria-label="triple action"
          icon={<TripleActionIcon />}
          isDisabled={actions.triple}
          onClick={() => {
            handleClick('triple', 3)
          }}
          width="100%"
        />
      </GridItem>
      <GridItem width="100%">
        <IconButton
          aria-label="reaction"
          icon={<ReactionIcon />}
          isDisabled={actions.reaction}
          onClick={() => {
            handleClick('reaction', 0)
          }}
          width="100%"
        />
      </GridItem>
      <GridItem width="100%">
        <Button
          colorScheme="red"
          onClick={() => {
            handleReset()
          }}
          width="100%"
        >
          Reset
        </Button>
      </GridItem>
    </Grid>
  )
}
