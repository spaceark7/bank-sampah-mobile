import { Filters } from '@/utils/types'
import React, { useCallback, useMemo, useRef } from 'react'
import { ActivityIndicator, Pressable, RefreshControl } from 'react-native'

import { Text, View } from '@/components/Themed'
import UIBarChart from '@/components/ui/charts/BarChart'

import ListCardItem, { ListCard } from '@/components/ui/list-card/list-card'
import useDebounceValue from '@/hooks/debounce/useDebounceValue'
import useToast from '@/hooks/global-toast/useToast'
import useRefreshScreen from '@/hooks/refresh-screen/useRefreshScreen'
import { MaterialEntity } from '@/services/material/material-entity'
import {
  MaterialApiSlice,
  useGetMaterialListQuery,
} from '@/services/material/material-slices'
import { useAppDispatch } from '@/store/hooks'
import { Button, Divider, Icon, useTheme } from '@rneui/themed'
import { FlashList } from '@shopify/flash-list'
import { Link, useRouter } from 'expo-router'
import InputFilter from '@/components/ui/input/input-filter'
import { CurrencyFormatter, parseFilter } from '@/utils/helpers/Functions'

const MaterialList = () => {
  const { theme } = useTheme()
  const ref = useRef<FlashList<MaterialEntity>>(null)
  const [filters, setFilters] = React.useState<Filters[]>([
    {
      title: 'Pencarian',
      key: 'search',
      value: undefined,
      condition: 'contains',
    },
    {
      title: 'Urutan',
      key: 'order',
      value: 'asc',
      condition: 'eq',
      options: [
        {
          label: 'Naik',
          value: 'asc',
        },
        {
          label: 'Turun',
          value: 'desc',
        },
      ],
    },
  ])
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [visible, setVisible] = React.useState(true)
  const dispatch = useAppDispatch()
  const debounceValue = useDebounceValue(search, 1000)
  const {
    data: materials,
    isLoading: materialLoading,
    isFetching: materialFetching,
    isSuccess: materialSuccess,
    refetch,
  } = useGetMaterialListQuery(
    {
      limit: limit,
      page: page,
      search: debounceValue,
      order: parseFilter(filters, 'order'),
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
      dispatch(MaterialApiSlice.util.invalidateTags(['Material']))
      dispatch(MaterialApiSlice.endpoints.getMaterialList.initiate())
      setLimit(materials?.data.length || 10)
    },
    state: { isFetching: materialFetching, isLoading: materialLoading },
  })

  //#region Render
  //* Render
  const renderItem = useCallback(
    ({ item }: { item: MaterialEntity }) => (
      <Link
        href={{
          pathname: '/edit-modal',
          params: {
            materialId: item.id,
            title: `Edit material`,
            segment: 'material-detail',
          },
        }}
        style={{
          width: '100%',
        }}
        asChild
      >
        <Pressable>
          <ListCardItem
            // title={item.user_detail.first_name + ' ' + item.user_detail.last_name}
            accessoryLeft={<Icon name='box' type='feather' size={24} />}
            // onPress={() => {
            //   router.push(`/(admin)/materials/${item.id}`)
            // }}
            // description={`Bergabung pada ${DateFormatter(
            //   item.user_detail.activated_at
            // )}`}

            accessoryRight={
              <Icon name='pencil' type='material-community' size={24} />
            }
          >
            <ListCard.Container>
              <Text>{item.name}</Text>
              <Text
                variants='h6'
                style={{
                  marginBottom: 10,
                }}
              >
                {CurrencyFormatter(item.base_price)}/{item.unit}
              </Text>
              {/* <Text variants='caption'>Unit: {item.unit}</Text>
              <Text variants='caption'>
                Harga satuan: {CurrencyFormatter(item.base_price)}
              </Text> */}
              <StatusIcon status={item.is_active} />
            </ListCard.Container>
          </ListCardItem>
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
        {materialSuccess ? (
          <UIBarChart
            title='Penggunaan Material'
            data={
              materials?.data.map((item) => {
                return {
                  label: item.name,
                  value: Math.floor(Math.random() * 100),
                }
              }) || []
            }
          />
        ) : null}
        <Divider
          style={{
            marginVertical: 20,
          }}
        />
        <Link
          href={{
            pathname: '/edit-modal',
            params: {
              title: `Tambah material`,
              segment: 'add-material',
            },
          }}
          asChild
        >
          <Pressable>
            <Button
              size='md'
              icon={{
                name: 'plus',
                type: 'material-community',
              }}
            >
              Tambah material
            </Button>
          </Pressable>
        </Link>
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
  }, [filters, search, setSearch, setFilters, materialSuccess])

  const ListEmptyComponent = useMemo(() => {
    if (!materialSuccess && materialLoading) {
      return <Text>Loading</Text>
    } else if (materials?.data.length === 0) {
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
  }, [materialSuccess, debounceValue, materialLoading, materials?.data.length])

  //#endregion
  //* Methods
  const onEndReached = () => {
    console.log('end', materials?.meta?.totalPages, page)
    if (!materials?.meta?.totalPages) refetch()
    if (!materialFetching) {
      if (materials?.meta?.totalPages && materials?.meta?.totalPages > page) {
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
    if (materials?.meta?.hasNextPage) {
      setLimit(limit + 10)
      // setPage(materials?.meta.currentPage + 1)
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
  return (
    <>
      <FlashList<MaterialEntity>
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
            {materialFetching && (
              <ActivityIndicator size='small' color={theme.colors.primary} />
            )}
            {visible &&
            !materialFetching &&
            materials?.meta?.totalItems &&
            materials?.meta?.totalItems > limit ? (
              <Button
                text
                size='sm'
                disabled={materialFetching}
                onPress={onLoadMore}
                title={materialFetching ? 'Sedang Memuat' : 'Muat lebih banyak'}
              ></Button>
            ) : null}
          </View>
        )}
        data={materials?.data || []}
        renderItem={renderItem}
        estimatedItemSize={80}
        getItemType={(item) => {
          return item.id
        }}
        keyExtractor={(item) => item.id}
        // onEndReached={() => !materialFetching && materialsuccess && onLoadMore()}
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

const StatusIcon = ({ status }: { status: boolean }) => {
  const { theme } = useTheme()
  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Icon
        size={14}
        color={status ? theme.colors.success : theme.colors.textSecondaryColor}
        name='checkbox-marked-circle'
        type='material-community'
      />
      <Text
        variants='caption'
        style={{
          color:
            theme.mode === 'dark'
              ? theme.colors.shade400
              : theme.colors.shade600,
        }}
      >
        {status ? 'Aktif' : 'Tidak Aktif'}
      </Text>
    </View>
  )
}

export default MaterialList
{
  /* <FAB
        visible
        placement='right'
        icon={{ name: 'add' }}
        color={theme.colors.primaryLight}
      /> */
}
