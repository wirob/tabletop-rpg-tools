import { Box, Flex, useColorModeValue } from '@repo/ui/chakra'
import { useState, useEffect } from 'react'

interface HealthBarProps {
  health: number // in percentage
}

function HealthBar(props: HealthBarProps): JSX.Element {
  const { health } = props

  const [healthBarColor, setHealthBarColor] = useState<string>()

  const green = useColorModeValue('green.500', 'green.200')
  const red = useColorModeValue('red.500', 'red.200')
  const orange = useColorModeValue('orange.500', 'orange.200')
  const grey = 'whiteAlpha.200'

  useEffect(() => {
    if (health <= 25) setHealthBarColor(red)
    else if (health <= 45) setHealthBarColor(orange)
    else setHealthBarColor(green)
  }, [health, setHealthBarColor, red, green, orange])

  return (
    <Flex alignItems="end" bg={grey} height="100%" width="32px">
      <Box
        bg={healthBarColor}
        style={{
          height: `${health}%`,
          width: 32,
          top: 0,
          position: 'relative',
        }}
      />
    </Flex>
  )
}

export default HealthBar
