import { SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import AdminScreen from '@/components/ui/screens/admin/admin-screen'

const administration = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <AdminScreen />
    </SafeAreaView>
  )
}

export default administration

const styles = StyleSheet.create({})
