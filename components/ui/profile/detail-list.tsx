import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type DetailListProps = {
  children: React.ReactNode
}

const DetailList: React.FC<DetailListProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default DetailList
