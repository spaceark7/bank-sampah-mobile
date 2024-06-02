import { StyleSheet, View } from 'react-native'
import React from 'react'
import useTabBarState from '@/hooks/tab-bar/useTabBar'
import { Tab, TabBar } from '@ui-kitten/components'
import TransactionList from './transactions/transaction-list'
import MemberList from './members/member-list'

const AdminScreen = () => {
  const topState = useTabBarState()
  return (
    <View style={styles.container}>
      <TabBar {...topState}>
        <Tab title='Transaksi' />
        <Tab title='Members' />
        <Tab title='Material' />
      </TabBar>
      {topState.selectedIndex === 0 && <TransactionList />}
      {topState.selectedIndex === 1 && <MemberList />}
    </View>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
})
