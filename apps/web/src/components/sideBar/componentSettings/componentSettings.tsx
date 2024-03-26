'use client'

import ConditionsSettings from './conditionsSettings'
import ExpSettings from './expSettings'
import HealthSettings from './healthSettings'

function ComponentSettings(): JSX.Element {
  return (
    <>
      <HealthSettings />
      <ExpSettings />
      <ConditionsSettings />
    </>
  )
}

export default ComponentSettings
