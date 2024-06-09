import { View, Text } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { CurrencyFormatter } from '@/utils/types'
import { Icon, ListItem, useTheme } from '@rneui/themed'
type TransactionItemProps = {
  title: string
  description: string
  type: string
  amount: number
}

const RedeemIcon = (props: any) => (
  <View
    style={{
      backgroundColor: props.color || '',
      padding: 10,
    }}
  >
    <MaterialIcons
      name='attach-money'
      size={24}
      color={props.fill || undefined}
    />
  </View>
)
const WithdrawIcon = (props: any) => (
  <View
    style={{
      backgroundColor: props.color || '',
      padding: 10,
    }}
  >
    <MaterialIcons
      name='attach-money'
      size={24}
      color={props.fill || undefined}
    />
  </View>
)

const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  description,
  type,
  amount,
}) => {
  const { theme } = useTheme()
  return (
    <ListItem>
      <Icon
        name='attach-money'
        color={type === 'Redeem' ? theme.colors.success : theme.colors.info}
      />
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{description}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Subtitle>{CurrencyFormatter(amount)}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default TransactionItem
