import React from 'react'
import {
  IndexPath,
  Input,
  Select,
  SelectItem,
  SelectProps,
  Text,
} from '@ui-kitten/components'

import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
} from 'react-hook-form'
import { View } from 'react-native'
import getFormErrorMessage from '@/components/ErrorTextMessage'

interface BaseSelectProps extends SelectProps {
  field: ControllerRenderProps<FieldValues, any>
  fieldState: ControllerFieldState
  inputField: any
  errors: FieldErrors<FieldValues>
}

const BaseSelect = ({
  field,
  inputField,
  fieldState,
  errors,
  ...rest
}: BaseSelectProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(
    new IndexPath(
      inputField.options.findIndex(
        (option: any) => option.value === field.value
      )
    )
  )

  return (
    <View
      style={
        inputField.containerStyle?.width
          ? {
              ...inputField.containerStyle,
            }
          : {
              width: '100%',
            }
      }
    >
      <Select
        label={inputField.label}
        id={field.name}
        status={
          fieldState.invalid
            ? 'danger'
            : fieldState.isTouched
            ? 'success'
            : 'basic'
        }
        value={inputField.options[(selectedIndex as IndexPath).row].label}
        onSelect={(data) => {
          console.log('data', data)
          setSelectedIndex(data)
          field.onChange(inputField.options[(data as IndexPath).row].value)
        }}
        caption={getFormErrorMessage(field.name, errors)}
        {...inputField.attr}
      >
        {inputField.options.map((option: any, index: number) => (
          <SelectItem key={index} title={option.label} />
        ))}
      </Select>
    </View>
  )
}

export default BaseSelect
