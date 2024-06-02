import { View, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useCallback } from 'react'
import ListCardItem from '../../list-card/list-card'
import { DateFormatter } from '@/utils/types'
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Spinner,
  useTheme,
} from '@ui-kitten/components'
import useRefreshScreen from '@/hooks/refresh-screen/useRefreshScreen'
import {
  MemberApiSlice,
  useGetAllMemberQuery,
} from '@/services/members/member-slices'
import { UserEntity } from '@/services/users/user-entity'
import SkeletonContent from '@alanantar_sb/react-native-skeleton-content'
import useToast from '@/hooks/global-toast/useToast'
import Toast from 'react-native-root-toast'
import { useAppDispatch } from '@/store/hooks'
import { FlashList } from '@shopify/flash-list'
import { Link, useRouter } from 'expo-router'

const MemberList = () => {
  const theme = useTheme()
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [visible, setVisible] = React.useState(true)
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
              <Icon
                name='person'
                fill={theme['color-info-500']}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
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
    <FlashList
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      scrollEnabled
      showsVerticalScrollIndicator={false}
      bounces
      ItemSeparatorComponent={() => (
        <Divider style={{ backgroundColor: theme['color-basic-200'] }} />
      )}
      ListEmptyComponent={() =>
        !memberSuccess && memberLoading ? (
          <SkeletonContent
            containerStyle={{
              gap: 10,
              width: '100%',
            }}
            isLoading={memberLoading}
            animationDirection='horizontalLeft'
            layout={Array.from({ length: 8 }, (_, i) => ({
              key: 'someId' + i,
              width: '100%',
              height: 60,
            }))}
          ></SkeletonContent>
        ) : null
      }
      ListFooterComponent={() => (
        <View
          style={{
            paddingVertical: 10,
          }}
        >
          {memberFetching && (
            <ActivityIndicator
              size='small'
              color={theme['color-primary-500']}
            />
          )}
          {visible && !memberFetching && (
            <Button
              appearance='ghost'
              size='small'
              disabled={memberFetching}
              accessoryLeft={() => {
                return memberFetching ? (
                  <Spinner size='small' />
                ) : (
                  <React.Fragment />
                )
              }}
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
    />
  )
}

export default MemberList
