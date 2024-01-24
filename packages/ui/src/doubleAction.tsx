'use client'

import { DoubleAction } from "./icons"

interface DoubleActionProps {
  onClick: React.MouseEventHandler<SVGSVGElement>
  disabled: boolean
}

export function DoubleActionButton({
  onClick,
  disabled,
}: DoubleActionProps): JSX.Element {
  // onClick={props.disabled ? undefined : props.onClick}
  return <DoubleAction />
}
