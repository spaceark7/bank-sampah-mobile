import { StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { useTheme } from '@rneui/themed'
import { Text, View } from '@/components/Themed'
import { Card } from '@rneui/themed'
const CardItem = ({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon?: ReactNode
}) => {
  const { theme } = useTheme()
  return (
    <View
      style={{
        flexBasis: '50%',
        padding: 2,
      }}
    >
      <Card
        containerStyle={{
          ...styles.card,
          backgroundColor: theme.colors.background,
        }}
      >
        <View
          style={{
            ...styles.row,
            marginBottom: 4,
          }}
        >
          <Text>{title}</Text>
          {icon}
        </View>
        <Text>{value}</Text>
      </Card>
    </View>
  )
}

export default CardItem

const styles = StyleSheet.create({
  card: {
    height: 120,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
