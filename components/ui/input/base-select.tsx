import React from 'react'

import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
} from 'react-hook-form'
import { View } from 'react-native'
import getFormErrorMessage from '@/components/ErrorTextMessage'
import { Dropdown } from 'react-native-element-dropdown'
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'
import { Text } from '@/components/Themed'
import { useTheme } from '@rneui/themed'

interface BaseSelectProps
  extends Omit<
    DropdownProps<any>,
    'data' | 'onChange' | 'labelField' | 'valueField'
  > {
  field: ControllerRenderProps<FieldValues, any>
  fieldState: ControllerFieldState
  inputField: any
  errors: FieldErrors<FieldValues>
}

const SelectItem = (item: any) => {
  return <Text>{item.label}</Text>
}

const BaseSelect = ({
  field,
  inputField,
  fieldState,
  errors,
  ...rest
}: BaseSelectProps) => {
  const { theme } = useTheme()
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
      <Text
        style={{
          fontSize: 12,
          marginBottom: 4,
          fontWeight: '400',
          color:
            theme.mode === 'dark'
              ? theme.colors.shade500
              : theme.colors.shade500,
        }}
      >
        {inputField.label}
      </Text>
      <Dropdown
        containerStyle={{
          borderColor:
            theme.mode === 'dark'
              ? theme.colors.shade900
              : theme.colors.shade400,
        }}
        itemContainerStyle={{
          backgroundColor:
            theme.mode === 'dark'
              ? theme.colors.shade800
              : theme.colors.background,
          padding: 6,
          borderColor:
            theme.mode === 'dark'
              ? theme.colors.shade600
              : theme.colors.shade400,
        }}
        itemTextStyle={{
          color: theme.colors.textColor,
        }}
        selectedTextStyle={{
          color:
            theme.mode === 'dark'
              ? theme.colors.shade100
              : theme.colors.shade700,
        }}
        activeColor={
          theme.mode === 'dark' ? theme.colors.shade700 : theme.colors.shade200
        }
        placeholderStyle={{
          color:
            theme.mode === 'dark'
              ? theme.colors.shade500
              : theme.colors.shade500,
        }}
        style={{
          height: 50,
          borderRadius: 6,
          borderWidth: 1,
          borderColor:
            theme.mode === 'dark'
              ? theme.colors.shade600
              : theme.colors.shade400,
          paddingHorizontal: 8,
          backgroundColor: 'rgba(0,0,0,0)',
        }}
        id={field.name}
        status={
          fieldState.invalid
            ? 'danger'
            : fieldState.isTouched
            ? 'success'
            : 'basic'
        }
        maxHeight={300}
        placeholder={inputField.placeholder ?? 'Pilih Item'}
        onChange={(data: { label: string; value: string }) => {
          console.log('data', data)
          field.onChange(data.value)
        }}
        labelField='label'
        valueField='value'
        renderItem={SelectItem}
        data={inputField.options}
        {...inputField.attr}
      />
      <Text
        style={{
          color: theme.colors.error,
          fontSize: 11,
        }}
      >
        {getFormErrorMessage(field.name, errors)}
      </Text>
    </View>
  )
}

export default BaseSelect
