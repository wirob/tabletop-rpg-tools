'use client'

import ExpSettings from './expSettings'
import HealthSettings from './healthSettings'

function ComponentSettings(): JSX.Element {
  return (
    <>
      <HealthSettings />
      <ExpSettings />
    </>
  )
}

export default ComponentSettings
