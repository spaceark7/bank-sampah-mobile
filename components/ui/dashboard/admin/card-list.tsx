import { StyleSheet } from 'react-native'
import React from 'react'
import CardItem from './card-item'
import { useGetAdminDashboardQuery } from '@/services/dashboard/dashboard-slices'
// import SkeletonContent from '@alanantar_sb/react-native-skeleton-content'
import { Icon } from '@rneui/themed'
import { View } from '@/components/Themed'
import ContentLoader from '../../content-loader/ContentLoader'

interface CardListProps {
  data: any
  state: {
    isLoading?: boolean
    isSuccess?: boolean
    isFetching?: boolean
    isError?: boolean
  }
}

const CardList = ({ data: adminDashboard, state }: CardListProps) => {
  return (
    <ContentLoader
      isLoading={state.isLoading || state.isFetching || false}
      type='card'
      length={4}
      height={120}
      row
    >
      <View style={styles.container}>
        {state.isSuccess &&
          !state.isFetching &&
          adminDashboard.map((item: any) => (
            <CardItem
              key={item.title}
              title={item.title}
              value={item.value}
              icon={
                <Icon type={'material-community'} name={item.icon} size={16} />
              }
            />
          ))}
      </View>
    </ContentLoader>
  )
}

{
  /* <SkeletonContent
  containerStyle={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 'auto',
    gap: 6,
  }}
  isLoading={(state?.isLoading || state?.isFetching) ?? false}
  animationDirection='horizontalLeft'
  layout={[
    {
      key: 'someId',
      flexBasis: '49%',

      height: 100,
    },
    { key: 'someOtherId', height: 100, flexBasis: '49%' },
    { key: 'someId2', height: 100, flexBasis: '49%' },
    { key: 'someOtherId2', height: 100, flexBasis: '49%' },
  ]}
>
  <View style={styles.container}>
    {state.isSuccess &&
      adminDashboard.map((item: any) => (
        <CardItem
          key={item.title}
          title={item.title}
          value={item.value}
          icon={
            <Icon
              type={'ionicon'}
              name={item.icon}
              style={{
                width: 16,
                height: 16,
              }}
            />
          }
        />
      ))}
  </View>
</SkeletonContent> */
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1,
  },
})

export default CardList
