import { Icon } from '@chakra-ui/react'

export function DoubleAction(): JSX.Element {
  return (
    <Icon boxSize={10} viewBox="0 0 39 24">
      <title id="two-action-icon">Two Actions</title>
      <path
        d="M38.165 11.817c-2.235 2.21-4.469 4.42-6.703 6.632-1.322 1.313-2.63 2.642-3.88 3.899l-5.18-5.176 5.48-5.4-5.53-5.37 5.19-5.225c.182.174.422.395.653.626 3.07 3.07 6.14 6.138 9.211 9.206.231.23.505.418.76.624v.184ZM0 11.817c1.18-1.132 2.364-2.26 3.54-3.399.24-.232.447-.498.595-.665l4.258 4.282-4.312 4.307L0 12v-.184Z"
        fill="currentColor"
      />
      <path
        d="M6.148 5.818 11.996 0l12.018 12.032L12.035 24l-5.737-5.718 6.26-6.085-6.41-6.379Z"
        fill="currentColor"
      />
    </Icon>
  )
}
