import { DateFormatter } from '@/utils/helpers/Functions'
import { Filters } from '@/utils/types'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { ButtonGroup, Icon, Input } from '@rneui/themed'
import React, { useMemo } from 'react'
import { Pressable } from 'react-native'

interface InputFilterDateProps {
  filter: Filters
  handleOnChange: (key: string, value: string) => void
  showButtonGroup?: boolean
  buttonGroups: {
    icon: string
    label?: string
  }[]
}
const InputFilterDate = ({
  filter,
  handleOnChange,
  showButtonGroup,
  buttonGroups,
}: InputFilterDateProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const buttonFields = useMemo(() => {
    return buttonGroups.map((item) => (
      <Icon name={item.icon} type='material-community' />
    ))
  }, [])
  return (
    <>
      {showButtonGroup && (
        <ButtonGroup
          selectedButtonStyle={{ backgroundColor: '#e2e2e2' }}
          buttons={buttonFields}
          selectedIndex={selectedIndex}
          onPress={setSelectedIndex}
          containerStyle={{
            width: '20%',
          }}
        />
      )}
      <Pressable
        onPress={() => {
          DateTimePickerAndroid.open({
            value: !filter.value ? new Date() : new Date(filter.value),
            onChange: (event, selectedDate) =>
              event.type === 'set' &&
              handleOnChange(
                filter.key,
                selectedDate ? selectedDate.toString() : ''
              ),
            mode: 'date',
          })
        }}
        style={{ width: '100%' }}
      >
        <Input
          variant='outlined'
          value={filter.value && DateFormatter(filter.value.toString())}
          readOnly
          rightIcon={{
            type: 'material-community',
            name: 'calendar',
            onPress: () => {
              DateTimePickerAndroid.open({
                value: !filter.value ? new Date() : new Date(filter.value),
                onChange: (event, selectedDate) =>
                  event.type === 'set' &&
                  handleOnChange(
                    filter.key,
                    selectedDate ? selectedDate.toString() : ''
                  ),
                mode: 'date',
              })
            },
          }}
        ></Input>
      </Pressable>
    </>
  )
}

export default InputFilterDate
