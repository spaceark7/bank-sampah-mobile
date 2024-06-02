import { View, Text, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { useGetTransactionsListQuery } from '@/services/transactions/transaction-slices'
import TransactionItem from '../../transaction/transaction-item'
import { DateFormatter } from '@/utils/types'
import { Divider } from '@ui-kitten/components'
import useRefreshScreen from '@/hooks/refresh-screen/useRefreshScreen'

export default function TransactionList() {
  const {
    data: transactions,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useGetTransactionsListQuery({
    order: 'asc',
  })

  const { isRefreshing, onRefresh } = useRefreshScreen({
    fetch: refetch,
    state: { isFetching, isLoading },
  })
  return (
    <View>
      {isSuccess && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          data={transactions.data}
          ListHeaderComponent={() => {
            return (
              <View>
                <Text>Transaction List</Text>
              </View>
            )
          }}
          ItemSeparatorComponent={() => (
            <Divider style={{ marginVertical: 2, marginHorizontal: 2 }} />
          )}
          ListEmptyComponent={() => <Text>Empty</Text>}
          renderItem={({ item }) => (
            <TransactionItem
              title={
                item.user_detail.first_name + ' ' + item.user_detail.last_name
              }
              description={`${DateFormatter(item.created_at)} | ${
                item.transaction_status
              }`}
              type={item.transaction_type}
              amount={item.transaction_detail.reduce(
                (acc, curr) => acc + curr.transaction_amount,
                0
              )}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  )
}
