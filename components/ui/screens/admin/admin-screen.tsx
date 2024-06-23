import { StyleSheet } from 'react-native'
import React from 'react'
import TransactionList from './transactions/transaction-list'
import MemberList from './members/member-list'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTheme } from '@rneui/themed'
import { View } from '@/components/Themed'
import MaterialList from './materials/material-screen'

const Tab = createMaterialTopTabNavigator()

const AdminScreen = () => {
  const { theme } = useTheme()
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: 'bold',
          },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Tab.Screen name='Transaksi' component={TransactionList} />
        <Tab.Screen name='Member' component={MemberList} />
        <Tab.Screen name='Material' component={MaterialList} />
      </Tab.Navigator>
    </View>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
})
