import { View, Text } from 'react-native'
import React from 'react'
import { Icon } from '@ui-kitten/components'
import { color } from '@/themes/tokens'

type IconProps = {
  name: string
  width?: number
  height?: number
  fill?: string
}

const IconDisplay = ({
  name,
  width = 32,
  height = 32,
  fill,
  ...props
}: IconProps) => {
  return (
    <Icon
      style={{
        width: width,
        height: height,
      }}
      name={name}
      {...props}
    />
  )
}

export default IconDisplay
