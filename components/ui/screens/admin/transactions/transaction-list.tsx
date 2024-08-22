import { Text, View } from '@/components/Themed'
import UIBarChart from '@/components/ui/charts/BarChart'
import InputFilter from '@/components/ui/input/input-filter'
import TransactionItem from '@/components/ui/transaction/transaction-item'
import useDebounceValue from '@/hooks/debounce/useDebounceValue'
import useToast from '@/hooks/global-toast/useToast'
import useRefreshScreen from '@/hooks/refresh-screen/useRefreshScreen'
import {
  TransactionApiSlice,
  useGetTransactionsListQuery,
} from '@/services/transactions/transaction-slices'
import { TransactionEntity } from '@/services/transactions/transactions-entities'
import { useAppDispatch } from '@/store/hooks'
import EFilterOptions from '@/utils/helpers/Filters'
import { DateFormatter, parseFilter } from '@/utils/helpers/Functions'
import { Filters } from '@/utils/types'
import { Button, Divider, useTheme } from '@rneui/themed'
import { FlashList } from '@shopify/flash-list'
import { Link, useRouter } from 'expo-router'
import React, { useCallback, useMemo, useRef } from 'react'
import { ActivityIndicator, Pressable, RefreshControl } from 'react-native'

export default function TransactionList() {
  const { theme } = useTheme()
  const ref = useRef<FlashList<TransactionEntity>>(null)
  const [filters, setFilters] = React.useState<Filters[]>([
    {
      key: 'search',
      value: undefined,

      condition: 'contains',
    },
    {
      title: 'Urutan',
      key: 'order',
      value: 'asc',
      type: 'radio',
      condition: 'eq',
      options: EFilterOptions.order,
    },

    {
      title: 'Tanggal',
      key: 'date',
      value: '',
      type: 'date',
      condition: 'eq',
    },
    {
      title: 'Jenis Transaksi',
      key: 'type',
      value: '',
      type: 'radio',

      options: EFilterOptions.transaction,
      condition: 'eq',
    },
  ])
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [visible, setVisible] = React.useState(true)
  const dispatch = useAppDispatch()
  const debounceValue = useDebounceValue(search, 1000)
  const {
    data: transactions,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useGetTransactionsListQuery(
    {
      limit: limit,
      page: page,
      search: debounceValue,
      order: parseFilter(filters, 'order'),
      filter: parseFilter(filters, 'date'),
      type: parseFilter(filters, 'type'),
    },
    {
      skip: !page,

      refetchOnMountOrArgChange: true,
    }
  )

  const { showToast } = useToast()
  const router = useRouter()

  const { isRefreshing, onRefresh } = useRefreshScreen({
    fetch: () => {
      dispatch(TransactionApiSlice.util.invalidateTags(['Transaction']))
      dispatch(TransactionApiSlice.endpoints.getTransactionsList.initiate())
      setLimit(transactions?.data.length || 10)
    },
    state: { isFetching, isLoading },
  })

  //#region  Render
  const renderItem = useCallback(
    ({ item }: { item: TransactionEntity }) => (
      <Link
        href={{
          pathname: '/edit-modal',
          params: {
            memberId: item.id,
            memberDetailId: item.user_detail.id,
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
            description={`${DateFormatter(item.created_at)}`}
            status={{
              text: item.transaction_status,
            }}
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
        <UIBarChart />
        {/* <Divider
          style={{
            marginVertical: 20,
          }}
        /> */}
        {/* <Link
          href={{
            pathname: '/edit-modal',
            params: {
              title: `Tambah Transaksi`,
              segment: 'add-transaksi',
            },
          }}
          asChild
        >
          <Button
            size='md'
            icon={{
              name: 'account-plus-outline',
              type: 'material-community',
            }}
          >
            Tambah Member
          </Button>
        </Link> */}
        <Divider
          style={{
            marginVertical: 20,
          }}
        />
        <InputFilter
          onScrollTo={focusToInputFilter}
          filters={filters}
          search={search}
          setSearch={setSearch}
          setFilters={(filter) => {
            setFilters(filter)
          }}
          resetFilters={() => resetFilter()}
        />
      </View>
    )
  }, [filters, search, setSearch, setFilters])

  const ListEmptyComponent = useMemo(() => {
    if (!isSuccess && isLoading) {
      return <Text>Loading</Text>
    } else if (transactions?.data.length === 0) {
      if (debounceValue && debounceValue.length > 0) {
        return (
          <Text
            style={{
              textAlign: 'center',
              padding: 20,
            }}
          >
            "{debounceValue}" Tidak ditemukan
          </Text>
        )
      }
      return <Text>{debounceValue && debounceValue} Tidak ada data</Text>
    }
  }, [isSuccess, debounceValue, isLoading, transactions?.data.length])

  //#endregion

  //#region Methods
  //* Methods
  const onEndReached = () => {
    console.log('end', transactions?.meta?.totalPages, page)
    if (!transactions?.meta?.totalPages) refetch()
    if (!isFetching) {
      if (
        transactions?.meta?.totalPages &&
        transactions?.meta?.totalPages > page
      ) {
        setPage(page + 1)
      } else {
        showToast({
          message: 'Tidak ada data lagi',
          type: 'info',
          position: 'bottom',
        })
      }
    }
  }
  const focusToInputFilter = () => {
    ref.current?.scrollToOffset({
      offset: 380,
      animated: true,
    })
  }

  const onLoadMore = () => {
    if (transactions?.meta?.hasNextPage) {
      setLimit(limit + 10)
      // setPage(transactions?.meta.currentPage + 1)
    } else {
      setVisible(false)
      showToast({
        message: 'Tidak ada data lagi',
        type: 'info',
        position: 'bottom',
      })
    }
  }

  const resetFilter = () => {
    setFilters((prev) =>
      prev.map((filter) => {
        if (filter.key === 'order') return { ...filter, value: 'asc' }
        else return { ...filter, value: undefined }
      })
    )
    setSearch('')
    setPage(1)
  }
  //#endregion

  return (
    <>
      <FlashList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ref={ref}
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
        ListHeaderComponent={
          ListHeaderComponent
          //   () => {
          //   return (
          //     <View
          //       style={{
          //         paddingBottom: 10,
          //       }}
          //     >
          //       {/* <UILineChart />
          //        */}
          //       <UIBarChart />
          //       <Divider
          //         style={{
          //           marginVertical: 20,
          //         }}
          //       />
          //       <Button size='md'>Tambah User</Button>
          //       <Divider
          //         style={{
          //           marginVertical: 20,
          //         }}
          //       />
          //       <InputFilter
          //         onScrollTo={focusToInputFilter}
          //         filters={filters}
          //         search={search}
          //         setSearch={setSearch}
          //         setFilters={(filter) => {
          //           setFilters(filter)
          //           // setPage(1)
          //         }}
          //       />
          //     </View>
          //   )
          // }
        }
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={() => (
          <View
            style={{
              paddingVertical: 10,
            }}
          >
            {isFetching && (
              <ActivityIndicator size='small' color={theme.colors.primary} />
            )}
            {visible &&
            !isFetching &&
            transactions?.meta?.totalItems &&
            transactions?.meta?.totalItems > limit ? (
              <Button
                text
                size='sm'
                disabled={isFetching}
                onPress={onLoadMore}
                title={isFetching ? 'Sedang Memuat' : 'Muat lebih banyak'}
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
        // onEndReached={() => !isFetching && transactionsuccess && onLoadMore()}
        // onEndReachedThreshold={1}
        extraData={limit}
        contentContainerStyle={{
          paddingTop: 14,
          backgroundColor: theme.colors.background,
        }}
      />
    </>
  )
}
