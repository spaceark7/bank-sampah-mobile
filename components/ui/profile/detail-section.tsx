import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Button, Divider, Text } from '@ui-kitten/components'
import IconDisplay from '../icon-display'
import DetailItem from './detail-item'
import DetailList from './detail-list'
import { getValueFromPath } from '@/utils/types'
const PenIcon = (props: any) => <IconDisplay name='edit-outline' {...props} />

type DetailSectionProps<T> = {
  data: T | null
  isLoading?: boolean
  field: any
  title?: string
  action?: () => void
}

const DetailSection = <T,>({
  data,
  isLoading = false,
  field,
  title = 'Data',
  action,
}: DetailSectionProps<T>) => {
  console.log('data', data)
  console.log(field)
  return isLoading ? null : (
    <View style={styles.container}>
      <View
        style={{
          ...styles.container,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text category='h6'>{title}</Text>
        <Button
          style={styles.iconButton}
          accessoryLeft={PenIcon}
          appearance='ghost'
          size='large'
          onPress={() => {
            action && action()
          }}
        />
      </View>
      <Divider />
      <DetailList>
        {field.map((item: any, index: number) => (
          <DetailItem
            key={index}
            label={item.label}
            width={item.width}
            type={item.type}
            content={data ? getValueFromPath(data, item.name) : ''}
            render={item.render}
          />
        ))}
      </DetailList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  iconButton: {
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
export default DetailSection
