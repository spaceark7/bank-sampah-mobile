import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native'

import CardList from '@/components/ui/screens/dashboard/admin/card-list'
import TransactionItem from '@/components/ui/transaction/transaction-item'

import ListCardItem from '@/components/ui/list-card/list-card'
import { useGetAdminDashboardQuery } from '@/services/dashboard/dashboard-slices'
import React from 'react'

import { Text, View } from '@/components/Themed'
import ContentLoader from '@/components/ui/content-loader/ContentLoader'
import { Avatar, Button, Divider, Icon, useTheme } from '@rneui/themed'
import { DateFormatter } from '@/utils/helpers/Functions'

export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false)

  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isSuccess: isDashboardSuccess,
    isFetching: isDashboardFetching,
    refetch: dashboardRefetch,
  } = useGetAdminDashboardQuery()

  const { theme } = useTheme()

  //* Methods
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    dashboardRefetch()

    if (!isDashboardFetching || !isDashboardLoading) {
      setRefreshing(false)
    }
  }, [isDashboardFetching, isDashboardLoading])

  // useEffect(() => {
  //   return () => {
  //     dispatch(UserApiSlice.util.invalidateTags(['Member']))
  //   }
  // }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              minHeight: 150,
            }}
          >
            <CardList
              data={dashboardData?.widgets}
              state={{
                isLoading: isDashboardLoading,
                isSuccess: isDashboardSuccess,
                isFetching: isDashboardFetching,
              }}
            />
            <Divider
              style={{
                marginVertical: 20,
              }}
            />
            {/* Button Action */}
            <View
              style={{
                ...styles.container,
                alignItems: 'center',
                paddingHorizontal: 20,
              }}
            >
              <Button
                outlined
                containerStyle={{
                  width: '48%',
                }}
                onPress={() => {}}
                icon={{
                  type: 'material-community',
                  name: 'upload',
                }}
              >
                Penyetoran
              </Button>
              <Button
                containerStyle={{
                  width: '48%',
                }}
                icon={{
                  type: 'material-community',
                  name: 'download',
                }}
                onPress={() => {}}
              >
                Penarikan
              </Button>
            </View>
            <Divider
              style={{
                marginVertical: 20,
              }}
            />
            {/* Latest Transaction List */}
            <View
              style={{
                flex: 1,
                paddingHorizontal: 16,
                gap: 10,
                paddingBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Riwayat Transaksi
                </Text>
                <Button size='sm' text onPress={() => {}}>
                  Lihat Semua
                </Button>
              </View>
              <ContentLoader
                isLoading={isDashboardFetching || isDashboardLoading}
                type='list'
                height={60}
              >
                {isDashboardSuccess &&
                  !isDashboardFetching &&
                  dashboardData?.latestTransaction.map((item, index) => (
                    <TransactionItem
                      key={index}
                      title={
                        item.user_detail.first_name +
                        ' ' +
                        item.user_detail.last_name
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
                  ))}
              </ContentLoader>
            </View>
            {/* Latest User List */}
            <View
              style={{
                flex: 1,
                paddingHorizontal: 16,
                gap: 10,
                paddingBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Member Terbaru
                </Text>
                <Button size='sm' text onPress={() => {}}>
                  Lihat Semua
                </Button>
              </View>

              <ContentLoader
                isLoading={isDashboardFetching || isDashboardLoading}
                type='list'
                height={60}
              >
                {isDashboardSuccess &&
                  dashboardData.latestUser.map((item, index) => (
                    <ListCardItem
                      key={index}
                      title={
                        item.user_detail.first_name +
                        ' ' +
                        item.user_detail.last_name
                      }
                      accessoryLeft={
                        item.user_detail.user_image_url ? (
                          <Avatar
                            source={{
                              uri: item.user_detail.user_image_url,
                            }}
                          />
                        ) : (
                          <Icon
                            type='ionicon'
                            name='person-circle-outline'
                            color={
                              theme.mode === 'dark'
                                ? theme.colors.shade400
                                : theme.colors.shade600
                            }
                            style={{
                              width: 24,
                              height: 24,
                            }}
                          />
                        )
                      }
                      description={`Bergabung pada ${DateFormatter(
                        item.user_detail.activated_at
                      )}`}
                    />
                  ))}
              </ContentLoader>
            </View>
          </View>
        </View>

        {/* <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
              }}
            >
              Member Terbaru
            </Text>
            <Button size='sm' onPress={() => {}}>
              Lihat Semua
            </Button>
          </View>
          <SkeletonContent
            containerStyle={{
              gap: 10,
              flex: 1,
              width: '100%',
            }}
            isLoading={isDashboardFetching || isDashboardLoading}
            animationDirection='horizontalLeft'
            layout={Array.from({ length: 10 }, (_, i) => ({
              key: 'someId' + i,
              width: '100%',
              height: 60,
            }))}
          >
            {isDashboardSuccess &&
              dashboardData.latestUser.map((item, index) => (
                <ListCardItem
                  key={index}
                  title={
                    item.user_detail.first_name +
                    ' ' +
                    item.user_detail.last_name
                  }
                  accessoryLeft={
                    item.user_detail.user_image_url ? (
                      <Avatar
                        source={{
                          uri: item.user_detail.user_image_url,
                        }}
                      />
                    ) : (
                      <Icon
                        type='ionicon'
                        name='person-circle-outline'
                        style={{
                          width: 24,
                          height: 24,
                        }}
                      />
                    )
                  }
                  description={`Bergabung pada ${DateFormatter(
                    item.user_detail.activated_at
                  )}`}
                />
              ))}
          </SkeletonContent>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    flex: 1,
    borderRadius: 10,
  },
})
