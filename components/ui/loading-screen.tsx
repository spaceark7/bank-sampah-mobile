import React from 'react'
import { Text, View } from '../Themed'

type LoadingScreenProps = {
  message: string
  status?:
    | 'basic'
    | 'primary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | undefined
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'
}
const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message,
  status,
  size = 'medium',
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>{message}</Text>
    </View>
  )
}

export default LoadingScreen
