import { Filters } from '@/utils/types'
import React, { useCallback, useMemo, useRef } from 'react'
import {
  ActivityIndicator,
  View as IView,
  Pressable,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native'

import { Text, View } from '@/components/Themed'
import UIBarChart from '@/components/ui/charts/BarChart'
import ContentLoader from '@/components/ui/content-loader/ContentLoader'
import InputFilter from '@/components/ui/input/input-filter'
import ListCardItem, { ListCard } from '@/components/ui/list-card/list-card'
import useDebounceValue from '@/hooks/debounce/useDebounceValue'
import useToast from '@/hooks/global-toast/useToast'
import useRefreshScreen from '@/hooks/refresh-screen/useRefreshScreen'
import {
  MemberApiSlice,
  useGetAllMemberQuery,
} from '@/services/members/member-slices'
import { UserEntity } from '@/services/users/user-entity'
import { useAppDispatch } from '@/store/hooks'
import { parseFilter } from '@/utils/helpers/Functions'
import {
  Avatar,
  Button,
  ButtonProps,
  Divider,
  Icon,
  useTheme,
} from '@rneui/themed'
import { FlashList } from '@shopify/flash-list'
import { Link, useRouter } from 'expo-router'

const MemberList = () => {
  const { theme } = useTheme()
  const ref = useRef<FlashList<UserEntity>>(null)
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
    {
      title: 'Status',
      type: 'radio',

      options: [
        {
          label: 'Aktif',
          value: '1',
        },
        {
          label: 'Belum aktif',
          value: '2',
        },
      ],
      key: 'is_active',
      value: '1',
      condition: 'eq',
    },
    {
      title: 'Jenis Kelamin',
      type: 'radio',

      key: 'status',
      value: '',
      options: [
        {
          label: 'Pria',
          value: 'Male',
        },
        {
          label: 'Wanita',
          value: 'Female',
        },
      ],
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
    data: members,
    isLoading: memberLoading,
    isFetching: memberFetching,
    isSuccess: memberSuccess,
    refetch,
  } = useGetAllMemberQuery(
    {
      limit: limit,
      page: page,
      search: debounceValue,
      is_active: parseFilter(filters, 'is_active'),
      status: parseFilter(filters, 'status'),
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
      dispatch(MemberApiSlice.util.invalidateTags(['Member']))
      dispatch(MemberApiSlice.endpoints.getAllMember.initiate())
      setLimit(members?.data.length || 10)
    },
    state: { isFetching: memberFetching, isLoading: memberLoading },
  })

  //#region  Render
  const renderItem = useCallback(
    ({ item }: { item: UserEntity }) => (
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
          <ListCardItem
            // title={item.user_detail.first_name + ' ' + item.user_detail.last_name}
            accessoryLeft={
              item.user_detail.user_image_url ? (
                <Avatar
                  rounded
                  size={50}
                  source={{
                    uri: item.user_detail.user_image_url,
                  }}
                />
              ) : (
                <Avatar
                  title={
                    item.user_detail.first_name[0].toUpperCase() +
                    item.user_detail.last_name[0].toUpperCase()
                  }
                  rounded
                  size={50}
                />
              )
            }
            // onPress={() => {
            //   router.push(`/(admin)/members/${item.id}`)
            // }}
            // description={`Bergabung pada ${DateFormatter(
            //   item.user_detail.activated_at
            // )}`}
          >
            <ListCard.Container>
              <Text>
                {item.user_detail.first_name} {item.user_detail.last_name}
              </Text>

              <Text
                variants='caption'
                style={{
                  color:
                    theme.mode === 'dark'
                      ? theme.colors.shade400
                      : theme.colors.shade500,
                }}
              >
                {item.email}
              </Text>
              <Text
                variants='caption'
                style={{
                  marginTop: 4,
                  color:
                    theme.mode === 'dark'
                      ? theme.colors.shade400
                      : theme.colors.shade600,
                }}
              >
                {item.user_detail.activated_at ? (
                  <StatusIcon status />
                ) : (
                  <StatusIcon status={false} />
                )}
              </Text>
            </ListCard.Container>
          </ListCardItem>
        </Pressable>
      </Link>
    ),
    []
  )

  const ListHeaderComponent = useMemo(() => {
    return memberLoading ? (
      <ContentLoader isLoading={memberLoading} length={1} height={200} />
    ) : (
      <View
        style={{
          paddingBottom: 10,
        }}
      >
        <UIBarChart />
        <Divider
          style={{
            marginVertical: 20,
          }}
        />
        <Link
          href={{
            pathname: '/edit-modal',
            params: {
              title: `Tambah Member`,
              segment: 'add-member',
            },
          }}
          asChild
        >
          <ActionButton />
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
  }, [filters, search, setSearch, setFilters, memberLoading])

  const ListEmptyComponent = useMemo(() => {
    if (!memberSuccess && memberLoading) {
      return <Text>Loading</Text>
    } else if (members?.data.length === 0) {
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
  }, [memberSuccess, debounceValue, memberLoading, members?.data.length])

  //#endregion

  //#region Methods
  //* Methods
  const onEndReached = () => {
    console.log('end', members?.meta?.totalPages, page)
    if (!members?.meta?.totalPages) refetch()
    if (!memberFetching) {
      if (members?.meta?.totalPages && members?.meta?.totalPages > page) {
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
    if (members?.meta?.hasNextPage) {
      setLimit(limit + 10)
      // setPage(members?.meta.currentPage + 1)
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
            {memberFetching && (
              <ActivityIndicator size='small' color={theme.colors.primary} />
            )}
            {visible &&
            !memberFetching &&
            members?.meta?.totalItems &&
            members?.meta?.totalItems > limit ? (
              <Button
                text
                size='sm'
                disabled={memberFetching}
                onPress={onLoadMore}
                title={memberFetching ? 'Sedang Memuat' : 'Muat lebih banyak'}
              ></Button>
            ) : null}
          </View>
        )}
        data={members?.data || []}
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
        {status ? 'Terverifikasi' : 'Belum Aktif'}
      </Text>
    </View>
  )
}

const ActionButton = React.forwardRef<IView, ButtonProps>((props, ref: any) => {
  return (
    <Pressable
      ref={ref}
      style={{
        flex: 1,
      }}
    >
      <Button
        TouchableComponent={TouchableWithoutFeedback}
        size='md'
        icon={{
          name: 'account-plus-outline',
          type: 'material-community',
        }}
        {...props}
      >
        Tambah Member
      </Button>
    </Pressable>
  )
})

export default MemberList
{
  /* <FAB
        visible
        placement='right'
        icon={{ name: 'add' }}
        color={theme.colors.primaryLight}
      /> */
}
