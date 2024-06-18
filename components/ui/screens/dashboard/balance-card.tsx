import { View, Text as TextNative } from 'react-native'
import React from 'react'
import { CurrencyFormatter } from '@/utils/types'
import { Text } from '@/components/Themed'
import { Button } from '@rneui/themed'

const BalanceCard = () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <View
      style={{
        justifyContent: 'space-between',
      }}
    >
      <Text
        variants='h6'
        style={{
          fontWeight: 'bold',
        }}
      >
        Saldo anda
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TextNative
          style={{
            fontSize: 32,
            fontWeight: 'bold',
          }}
        >
          {visible ? CurrencyFormatter(1000000) : '********'}
        </TextNative>

        <Button
          style={{
            borderRadius: 50,
            width: 50,
            height: 50,
          }}
          size='lg'
          text
          onPress={() => setVisible(!visible)}
        />
      </View>
    </View>
  )
}

export default BalanceCard
