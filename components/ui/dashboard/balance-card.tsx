import { View, Text as TextNative } from 'react-native'
import React from 'react'
import { CurrencyFormatter } from '@/utils/types'
import { Button, Text } from '@ui-kitten/components'
import IconDisplay from '../icon-display'

const BalanceCard = () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <View
      style={{
        justifyContent: 'space-between',
      }}
    >
      <Text
        appearance='hint'
        style={{
          fontWeight: 'bold',
        }}
        category='s1'
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
          size='large'
          appearance='ghost'
          status='primary'
          accessoryLeft={<IconDisplay name={visible ? 'eye' : 'eye-off-2'} />}
          onPress={() => setVisible(!visible)}
        />
      </View>
    </View>
  )
}

export default BalanceCard
