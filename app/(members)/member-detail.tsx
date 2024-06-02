import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const MemberDetail = () => {
  const { members } = useLocalSearchParams()
  return (
    <View
      style={{
        paddingTop: 20,
      }}
    >
      <Text>Members {members}</Text>
    </View>
  )
}

export default MemberDetail

const styles = StyleSheet.create({})
