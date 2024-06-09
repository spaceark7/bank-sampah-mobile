import { View } from '@/components/Themed'
import { Skeleton } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'

interface ContentLoaderProps {
  isLoading: boolean
  type?: 'list-icon' | 'list' | 'card'
  height?: number
  width?: number
  row?: boolean
  columnLength?: number
  children?: React.ReactNode
  length?: number
}
const ContentLoader = (props: ContentLoaderProps) => {
  const { type, height, width, length, columnLength } = props
  const columnWidth = useMemo(() => {
    const gap = 10 // Gap value
    const totalGapSpace = gap * ((columnLength || 2) - 1) // Total space taken by gaps
    const availableWidth = 100 - totalGapSpace // Available width after considering gaps
    return availableWidth / (columnLength || 2) // Width of each column
  }, [columnLength])
  return (
    <>
      {(type === 'list' || !type) &&
        props.isLoading &&
        Array.from({ length: props.length || 5 }).map((_, index) => (
          <Skeleton
            key={index}
            LinearGradientComponent={LinearGradient}
            animation='wave'
            height={height || 50}
            width={width || '100%'}
          />
        ))}
      {type === 'card' && props.isLoading && (
        <View
          style={{
            ...styles.rowContainer,
            flexDirection: props.row ? 'row' : 'column',
            flexWrap: props.row ? 'wrap' : 'nowrap',
            justifyContent: 'space-between',
            gap: 10,
            padding: 10,
          }}
        >
          {Array.from({ length: length || 4 }).map((_, index) => {
            // Calculate the width of each column considering the gap

            return (
              <Skeleton
                key={index}
                LinearGradientComponent={LinearGradient}
                animation='wave'
                height={height || 200}
                width={`${columnWidth}%` || '100%'}
              />
            )
          })}
        </View>
      )}
      {type === 'list-icon' &&
        props.isLoading &&
        Array.from({ length: props.length || 5 }).map((_, index) => (
          <View style={styles.rowContainer}>
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation='wave'
              circle
              height={40}
              width={40}
            />
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation='wave'
              height={50}
            />
          </View>
        ))}
      {!props.isLoading && props.children}
    </>
  )
}

export default ContentLoader

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    gap: 10,
  },
})
