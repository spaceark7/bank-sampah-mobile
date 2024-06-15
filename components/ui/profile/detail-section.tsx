import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import DetailItem from './detail-item'
import DetailList from './detail-list'
import { getValueFromPath } from '@/utils/types'
import { Text } from '@/components/Themed'
import { Button, Divider, useTheme } from '@rneui/themed'

type DetailSectionProps<T> = {
  data: T | null
  isLoading?: boolean
  field: any
  title?: string
  action?: () => void
}

function CustomPressable() {
  return (props: any) => <Pressable {...props}>{props.children}</Pressable>
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
  const { theme } = useTheme()
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
        <Text>{title}</Text>
        <Button
          style={styles.iconButton}
          icon={{
            type: 'material-community',
            name: 'pencil',
            color: theme.colors?.shade500,
          }}
          text
          size='lg'
          containerStyle={{
            borderRadius: 50,
          }}
          rounded
          onPress={() => {
            action && action()
          }}
          useForeground={false}
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
    padding: 8,
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
