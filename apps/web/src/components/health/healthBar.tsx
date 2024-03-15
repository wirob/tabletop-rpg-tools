import { Box, useColorModeValue } from '@repo/ui/chakra'
import { useState, useEffect } from 'react'

interface HealthBarProps {
  health: number
  temp: number
}

function HealthBar(props: HealthBarProps): JSX.Element {
  const { health, temp } = props

  const [healthBarColor, setHealthBarColor] = useState<string>()

  const green = useColorModeValue('green.500', 'green.200')
  const midGreenOrange = useColorModeValue('#81bf2f', '#c3f194')
  const orange = useColorModeValue('orange.500', 'orange.200')
  const midOrangeRed = useColorModeValue('#e1522f', '#e1522f')
  const red = useColorModeValue('red.500', 'red.200')
  const grey = useColorModeValue('gray.100', 'whiteAlpha.200')

  useEffect(() => {
    if (health <= 25) setHealthBarColor(red)
    else if (health <= 45) setHealthBarColor(orange)
    else setHealthBarColor(green)
  }, [health, setHealthBarColor, red, green, orange])

  const size = '1rem'
  const color = 'rgba(255, 255, 255, 0.8)'

  return (
    <Box bg={grey} height="100%" position="relative" width={8}>
      <Box
        bg={healthBarColor}
        bottom="0"
        height={`${health}%`}
        maxHeight="100%"
        position="absolute"
        transitionDuration="300ms"
        transitionProperty="all"
        width={8}
      />
      <Box
        backgroundImage={`linear-gradient(
          45deg,
          ${color} 25%,
          transparent 25%,
          transparent 50%,
          ${color} 50%,
          ${color} 75%,
          transparent 75%,
          transparent
        )`}
        backgroundSize={`${size} ${size}`}
        bottom="0"
        height={`${temp}%`}
        maxHeight="100%"
        position="absolute"
        transitionDuration="300ms"
        transitionProperty="all"
        width={8}
      />
    </Box>
  )
}

export default HealthBar
