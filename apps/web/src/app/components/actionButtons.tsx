'use client'

import { IconButton } from '@repo/ui/chakra'

interface ActionButtonProps {
  children: React.ReactNode
  disabled: boolean
  label: string
  onClick: () => void
}

export function ActionButton({
  label,
  children,
  disabled,
  onClick,
}: ActionButtonProps): JSX.Element {
  // onClick={props.disabled ? undefined : props.onClick}
  return (
    <IconButton
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </IconButton>
  )
}
