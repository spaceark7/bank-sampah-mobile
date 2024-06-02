import { View, Text } from 'react-native'
import React from 'react'
import { ListItem, useTheme } from '@ui-kitten/components'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { CurrencyFormatter } from '@/utils/types'
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
  const theme = useTheme()
  return (
    <ListItem
      title={title}
      description={description}
      accessoryLeft={(data) =>
        type === 'Redeem' ? (
          <RedeemIcon
            fill={theme['color-success-600']}
            color={theme['color-success-100']}
            {...data}
          />
        ) : (
          <WithdrawIcon
            fill={theme['color-info-600']}
            color={theme['color-info-transparent-100']}
            {...data}
          />
        )
      }
      accessoryRight={() => (
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          {CurrencyFormatter(amount)}
        </Text>
      )}
    />
  )
}

export default TransactionItem
