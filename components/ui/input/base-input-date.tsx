import React from 'react'
import DateTimePicker, {
  BaseProps,
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker'

import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
} from 'react-hook-form'
import getFormErrorMessage from '@/components/ErrorTextMessage'
import { View } from '@/components/Themed'
import { Input } from '@rneui/themed'

interface BaseInputDateProps extends BaseProps {
  field: ControllerRenderProps<FieldValues, any>
  fieldState: ControllerFieldState
  inputField: any
  errors: FieldErrors<FieldValues>
}

const BaseInputDate = ({
  field,
  inputField,
  fieldState,
  errors,
  ...rest
}: BaseInputDateProps) => {
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
      {/* <DateTimePicker
        // label={inputField.label}
        testID={field.name}
        // min={new Date(1900, 0, 0)}
        // max={new Date()}
        value={new Date(field.value)}
        {...inputField.attr}
        // className={classNames(
        //   {
        //     'p-invalid': fieldState.invalid,
        //   },
        //   inputField.inputClassName || 'w-full'
        // )}
      /> */}
      <Input
        id={field.name}
        label={inputField.label}
        invalid={fieldState.invalid}
        value={field.value.toString()}
        rightIcon={{
          type: 'material-community',
          name: 'calendar',
          onPress: () => {
            DateTimePickerAndroid.open({
              value: !field.value ? new Date() : new Date(field.value),
              onChange: (event, selectedDate) => field.onChange(selectedDate),
              mode: 'date',
            })
          },
        }}
        onChangeText={(data: any) => field.onChange(data)}
        errorMessage={getFormErrorMessage(field.name, errors)}
        {...inputField.attr}
      ></Input>
    </View>
  )
}

export default BaseInputDate
