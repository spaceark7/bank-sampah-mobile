import { RefreshControl, ActivityIndicator } from 'react-native'
import React, { useCallback } from 'react'
import { DateFormatter } from '@/utils/types'

import useRefreshScreen from '@/hooks/refresh-screen/useRefreshScreen'
import {
  MemberApiSlice,
  useGetAllMemberQuery,
} from '@/services/members/member-slices'
import { UserEntity } from '@/services/users/user-entity'
import useToast from '@/hooks/global-toast/useToast'
import Toast from 'react-native-root-toast'
import { useAppDispatch } from '@/store/hooks'
import { FlashList } from '@shopify/flash-list'
import { Link, useRouter } from 'expo-router'
import ListCardItem from '@/components/ui/list-card/list-card'
import { Text, View } from '@/components/Themed'
import { Avatar, Button, Divider, FAB, Input } from '@rneui/themed'
import { useTheme } from '@rneui/themed'
import UILineChart from '@/components/ui/charts/LineChart'
import UIBarChart from '@/components/ui/charts/BarChart'
import InputFilter from '@/components/ui/input/input-filter'
import GlobalBottomSheet from '@/components/ui/modal/global-bottom-sheet'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const MemberList = () => {
  const { theme } = useTheme()
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [visible, setVisible] = React.useState(true)
  const [showBottomSheet, setShowBottomSheet] = React.useState(false)
  const dispatch = useAppDispatch()
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
          position: Toast.positions.BOTTOM - 30,
        })
      }
    }
  }
  const toggleBottomSheet = () => {
    setShowBottomSheet((prev) => !prev)
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
        position: Toast.positions.BOTTOM - 30,
      })
    }
  }

  const renderItem = useCallback(
    ({ item }: { item: UserEntity }) => (
      <Link
        href={{
          pathname: '/(members)/member-detail',
          params: { members: item.id },
        }}
        style={{
          width: '100%',
        }}
        asChild
      >
        <ListCardItem
          // title={item.user_detail.first_name + ' ' + item.user_detail.last_name}
          title={item.email}
          accessoryLeft={
            item.user_detail.user_image_url ? (
              <Avatar
                source={{
                  uri: item.user_detail.user_image_url,
                }}
              />
            ) : (
              <Avatar title='A' size={20} />
            )
          }
          // onPress={() => {
          //   router.push(`/(admin)/members/${item.id}`)
          // }}
          description={`Bergabung pada ${DateFormatter(
            item.user_detail.activated_at
          )}`}
        />
      </Link>
    ),
    []
  )

  return (
    <>
      <FlashList
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
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
        ListHeaderComponent={() => {
          return (
            <>
              <View
                style={{
                  paddingBottom: 10,
                }}
              >
                {/* <UILineChart />
                 */}
                <UIBarChart />
                <Divider
                  style={{
                    marginVertical: 20,
                  }}
                />
                <Button size='md'>Tambah User</Button>
                <Divider
                  style={{
                    marginVertical: 20,
                  }}
                />
              </View>
              <InputFilter />
              <GlobalBottomSheet
                isVisible={showBottomSheet}
                onDismiss={toggleBottomSheet}
              />
            </>
          )
        }}
        ListEmptyComponent={() =>
          !memberSuccess && memberLoading ? <Text>Loading</Text> : null
        }
        ListFooterComponent={() => (
          <View
            style={{
              paddingVertical: 10,
            }}
          >
            {memberFetching && (
              <ActivityIndicator size='small' color={theme.colors.primary} />
            )}
            {visible && !memberFetching && (
              <Button
                text
                size='sm'
                disabled={memberFetching}
                // accessoryLeft={() => {
                //   return memberFetching ? (
                //     <Spinner size='small' />
                //   ) : (
                //     <React.Fragment />
                //   )
                // }}
                onPress={onLoadMore}
              >
                {memberFetching ? 'Sedang Memuat' : 'Muat lebih banyak'}
              </Button>
            )}
          </View>
        )}
        data={members?.data || []}
        renderItem={renderItem}
        estimatedItemSize={80}
        getItemType={(item) => {
          return item.email
        }}
        keyExtractor={(item) => item.email}
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

export default MemberList
{
  /* <FAB
        visible
        placement='right'
        icon={{ name: 'add' }}
        color={theme.colors.primaryLight}
      /> */
}
