import { View, StyleSheet } from 'react-native'
import React, { ComponentType, ReactNode } from 'react'
import { Divider, Text, useTheme } from '@ui-kitten/components'
import { DateFormatter } from '@/utils/types'

type DetailItemProps = {
  label: string
  content: string
  width: 'half' | 'full'
  type?: 'text' | 'date' | 'separator'
  render?: (data: any) => ReactNode
}

const DetailItem: React.FC<DetailItemProps> = ({
  label,
  content,
  width = 'full',
  type = 'text',
  render: CustomComponent,
  ...rest
}) => {
  const theme = useTheme()
  return (
    <View
      style={{
        ..._styles.container,
        width: width === 'full' ? '100%' : '50%',
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          backgroundColor: theme['background-basic-color-1'],
          borderRadius: 10,
          paddingHorizontal: 10,
          borderBottomWidth: type !== 'separator' ? 1 : 0,
          borderBottomColor: theme['color-basic-400'],
          flex: 1,
        }}
      >
        {type === 'separator' ? (
          <Text appearance='hint' category='h6'>
            {label}
          </Text>
        ) : (
          <Text appearance='hint' category='label'>
            {label}
          </Text>
        )}

        {CustomComponent ? (
          CustomComponent(content)
        ) : (
          <Text
            category='p1'
            style={{
              paddingVertical: 10,
            }}
          >
            {type === 'date' ? DateFormatter(content) : content}
          </Text>
        )}
      </View>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0)',
    width: '50%',
  },
  iconButton: {
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})

export default DetailItem
