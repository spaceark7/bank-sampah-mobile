import { View, Text } from 'react-native'
import React from 'react'
import { List } from '@ui-kitten/components'
import TransactionItem from './transaction-item'

const data = new Array(12).fill({
  title: 'Title for Item',
  description: 'Description for Item',
  type: 'Redeem',
  amount: 200000,
})
const TransactionList = () => {
  return (
    <List
      data={data}
      renderItem={({ item }) => (
        <TransactionItem
          title={item.title}
          description={item.description}
          type={item.type}
          amount={item.amount}
        />
      )}
    />
  )
}

export default TransactionList
