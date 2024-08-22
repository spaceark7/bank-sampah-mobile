import { Text } from '@/components/Themed'
import { CurrencyFormatter } from '@/utils/helpers/Functions'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Icon, ListItem, useTheme } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'
type TransactionItemProps = {
  title: string
  description: string
  status?: {
    icon?: React.ReactNode
    text: string
  }
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
  status,
  amount,
}) => {
  const { theme } = useTheme()

  const statusColor = (type: string | undefined) => {
    switch (type) {
      case 'Success':
        return theme.colors.success
      case 'Pending':
        return theme.colors.warning
      case 'Rejected':
        return theme.colors.danger
      default:
        return theme.colors.textColor
    }
  }

  return (
    <ListItem>
      <Icon
        name='attach-money'
        color={type === 'Redeem' ? theme.colors.success : theme.colors.info}
      />
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{description}</ListItem.Subtitle>
        {status && (
          <ListItem.Subtitle>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0)',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <StatusIcon status={status.text} />
              <Text
                variants='caption'
                style={{ color: statusColor(status.text) }}
              >
                {status.text}
              </Text>
            </View>
            {/* {status?.icon ? (
              status.icon
            ) : (
              <Icon
                size={14}
                name='checkbox-marked-circle'
                type='material-community'
              />
            )} */}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Subtitle>{CurrencyFormatter(amount)}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

const StatusIcon = ({ status }: { status: string }) => {
  const { theme } = useTheme()
  switch (status) {
    case 'Success':
      return (
        <Icon
          size={14}
          color={theme.colors.success}
          name='checkbox-marked-circle'
          type='material-community'
        />
      )
    case 'Pending':
      return (
        <Icon
          size={14}
          color={theme.colors.warning}
          name='alert-circle'
          type='material-community'
        />
      )
    case 'Rejected':
      return (
        <Icon
          size={14}
          color={theme.colors.danger}
          name='close-circle'
          type='material-community'
        />
      )
    default:
      return null
  }

}

export default TransactionItem
