import { ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { Text, View } from '@/components/Themed'
import { useGetMemberByIdQuery } from '@/services/members/member-slices'
import { Avatar, Button, Icon, useTheme } from '@rneui/themed'
import { CurrencyFormatter, DateFormatter } from '@/utils/types'
import {
  TransactionApiSlice,
  useGetTransactionListByMemberIdQuery,
} from '@/services/transactions/transaction-slices'
import useRefreshScreen from '@/hooks/refresh-screen/useRefreshScreen'
import { useAppDispatch } from '@/store/hooks'
import useToast from '@/hooks/global-toast/useToast'
import Toast from 'react-native-root-toast'
import { FlashList } from '@shopify/flash-list'
import { RefreshControl } from 'react-native-gesture-handler'
import InputFilter from '../../../input/input-filter'
import { TransactionEntity } from '@/services/transactions/transactions-entities'
import { Link } from 'expo-router'
import TransactionItem from '../../../transaction/transaction-item'
import { Divider } from '@rneui/base'

type MemberDetailAdminProps = {
  memberId?: string
  memberDetailId?: string
}
const MemberDetailAdmin = ({
  memberId,
  memberDetailId,
}: MemberDetailAdminProps) => {
  const [search, setSearch] = React.useState('')
  const [visible, setVisible] = React.useState(true)

  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const dispatch = useAppDispatch()

  const { theme } = useTheme()
  const { showToast } = useToast()

  const {
    data: member,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetMemberByIdQuery(memberId as string, {
    refetchOnFocus: true,
    skip: !memberId,
  })

  const {
    data: transactions,
    isLoading: transactionsLoading,
    isFetching: transactionsFetching,
    isSuccess: transactionsSuccess,
    isError: transactionsError,
    refetch,
  } = useGetTransactionListByMemberIdQuery({
    user_id: memberDetailId,
    limit: limit,
    page: page,
  })

  //* Hooks
  const { isRefreshing, onRefresh } = useRefreshScreen({
    fetch: () => {
      dispatch(TransactionApiSlice.util.invalidateTags(['Transaction']))
      dispatch(
        TransactionApiSlice.endpoints.getTransactionListByMemberId.initiate({
          user_id: memberId,
          limit: limit,
          page: page,
        })
      )
      setLimit(transactions?.data.length || 10)
    },
    state: {
      isFetching: transactionsFetching,
      isLoading: transactionsLoading,
    },
  })

  //* Methods

  const onLoadMore = () => {
    if (transactions?.meta?.hasNextPage) {
      setLimit(limit + 10)
      // setPage(members?.meta.currentPage + 1)
    } else {
      setVisible(false)
      showToast({
        message: 'Tidak ada data lagi',
        type: 'info',
        position: Toast.positions.BOTTOM - 30,
      })
    }
  }
  const onEndReached = () => {
    console.log('end', transactions?.meta?.totalPages, page)
    if (!transactions?.meta?.totalPages) refetch()
    if (!transactionsFetching) {
      if (
        transactions?.meta?.totalPages &&
        transactions?.meta?.totalPages > page
      ) {
        setPage(page + 1)
      } else {
        showToast({
          message: 'Tidak ada data lagi',
          type: 'info',
          position: Toast.positions.BOTTOM - 30,
        })
      }
    }
  }
  //   }
  //   const focusToInputFilter = () => {
  //     ref.current?.scrollToOffset({
  //       offset: 380,
  //       animated: true,
  //     })
  //   }

  //* Custom Render

  const renderItem = useCallback(
    ({ item }: { item: TransactionEntity }) => (
      <Link
        href={{
          pathname: '/edit-modal',
          params: {
            memberId: item.id,
            title: `Detail Member`,
            segment: 'member-detail',
          },
        }}
        style={{
          width: '100%',
        }}
        asChild
      >
        <Pressable>
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
        </Pressable>
      </Link>
    ),
    []
  )

  const ListHeaderComponent = useMemo(() => {
    return (
      <View
        style={{
          paddingBottom: 10,
        }}
      >
        {isSuccess && (
          <View
            style={{
              gap: 10,
            }}
          >
            {/* Header */}
            <View
              style={{
                ...styles.row,
              }}
            >
              {member.data.user_detail.user_image_url ? (
                <Avatar
                  rounded
                  size={80}
                  source={{
                    uri: member.data.user_detail.user_image_url,
                  }}
                />
              ) : (
                <Avatar
                  title={
                    member.data.user_detail.first_name[0].toUpperCase() +
                    member.data.user_detail.last_name[0].toUpperCase()
                  }
                  titleStyle={{
                    padding: 6,
                  }}
                  rounded
                  containerStyle={{
                    backgroundColor:
                      theme.mode === 'dark'
                        ? theme.colors.shade700
                        : theme.colors.shade400,
                  }}
                  size={80}
                />
              )}
              {/* Header */}
              <View style={styles.transparentBackground}>
                <Text
                  variants='subtitle1'
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 4,
                  }}
                >
                  {member.data.user_detail.first_name} {member.data.user_detail.last_name}
                </Text>
                <Text variants='caption'>Telah menjadi member sejak</Text>
                <Text variants='caption'>
                  {DateFormatter(member.data.user_detail.activated_at)}
                </Text>
              </View>
            </View>
            {/* Credits */}
            <View
              style={{
                ...styles.card,
                backgroundColor:
                  theme.mode === 'dark'
                    ? theme.colors.shade800
                    : theme.colors.background,
              }}
            >
              <View
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                  },
                  styles.transparentBackground,
                ]}
              >
                <Icon name='wallet' />
                <Text variants='h6'>Saldo</Text>
              </View>
              <Text variants='h1'>
                {CurrencyFormatter(member.data.user_detail.balance?.balance_amount)}
              </Text>

              <Text
                variants='caption'
                style={{
                  marginTop: 18,
                }}
              >
                Transaksi terakhir{' '}
                {DateFormatter(member.data.user_detail.activated_at)}
              </Text>
            </View>
            {/* Member Detail */}
            <Link
              href={{
                pathname: '/edit-modal',
                params: {
                  memberId: memberId,
                  title: `Profile Member`,
                  segment: 'member-profile',
                },
              }}
              style={{
                width: '100%',
              }}
              asChild
            >
              <Button color='secondary' title={'Lihat Profil Member'} />
            </Link>
            <Divider
              style={{
                marginVertical: 10,
              }}
              subHeader='Riwayat Transaksi'
              subHeaderStyle={{
                fontWeight: 'bold',
                color:
                  theme.mode === 'dark'
                    ? theme.colors.shade500
                    : theme.colors.shade600,
              }}
            />
          </View>
        )}

        {/* <InputFilter
        onScrollTo={focusToInputFilter}
        filters={filters}
        search={search}
        setSearch={setSearch}
        setFilters={(filter) => {
          setFilters(filter)
        }}
        resetFilters={() => resetFilter()}
      /> */}
      </View>
    )
  }, [isSuccess])

  const ListEmptyComponent = useMemo(() => {
    if (!transactionsSuccess && transactionsLoading) {
      return <Text>Loading</Text>
    } else if (transactions?.data.length === 0) {
      //   if (debounceValue && debounceValue.length > 0) {
      //     return (
      //       <Text
      //         style={{
      //           textAlign: 'center',
      //           padding: 20,
      //         }}
      //       >
      //         "{debounceValue}" Tidak ditemukan
      //       </Text>
      //     )
      //   }
      return <Text>Tidak ada data</Text>
    }
  }, [transactionsSuccess, transactionsLoading, transactions?.data.length])

  return (
    <View style={styles.container}>
      <FlashList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        // ref={ref}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        bounces
        ItemSeparatorComponent={() => (
          <View
            style={{
              paddingVertical: 6,
            }}
          />
        )}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={() => (
          <View
            style={{
              paddingVertical: 10,
            }}
          >
            {transactionsFetching && (
              <ActivityIndicator size='small' color={theme.colors.primary} />
            )}
            {visible &&
            !transactionsFetching &&
            transactions?.meta?.totalItems &&
            transactions?.meta?.totalItems > limit ? (
              <Button
                text
                size='sm'
                disabled={transactionsFetching}
                onPress={onLoadMore}
                title={
                  transactionsFetching ? 'Sedang Memuat' : 'Muat lebih banyak'
                }
              ></Button>
            ) : null}
          </View>
        )}
        data={transactions?.data || []}
        renderItem={renderItem}
        estimatedItemSize={80}
        getItemType={(item) => {
          return item.id
        }}
        keyExtractor={(item) => item.id}
        // onEndReached={() => !memberFetching && memberSuccess && onLoadMore()}
        // onEndReachedThreshold={1}
        extraData={limit}
        contentContainerStyle={{
          paddingTop: 14,
          backgroundColor: theme.colors.background,
        }}
      />
    </View>
  )
}

export default MemberDetailAdmin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    marginBottom: 10,
  },
  transparentBackground: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  card: {
    padding: 20,
    borderRadius: 10,

    elevation: 2,
  },
})
