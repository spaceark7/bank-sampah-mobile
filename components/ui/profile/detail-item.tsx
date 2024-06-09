import { StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { DateFormatter } from '@/utils/types'
import { useTheme } from '@rneui/themed'
import { Text, View } from '@/components/Themed'

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
  const { theme } = useTheme()
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
          borderRadius: 10,
          paddingHorizontal: 10,
          borderBottomWidth: type !== 'separator' ? 1 : 0,
          flex: 1,
          borderColor:
            theme.mode === 'dark'
              ? theme.colors.shade700
              : theme.colors?.shade300,
        }}
      >
        {type === 'separator' ? (
          <Text
            style={{
              color: theme.colors?.shade400,
            }}
          >
            {label}
          </Text>
        ) : (
          <Text
            style={{
              color:
                theme.mode === 'dark'
                  ? theme.colors?.shade400
                  : theme.colors?.shade500,
            }}
          >
            {label}
          </Text>
        )}

        {CustomComponent ? (
          CustomComponent(content)
        ) : (
          <Text
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
