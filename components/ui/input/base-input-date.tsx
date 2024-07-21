import {
  BaseProps,
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker'
import React, { useCallback } from 'react'

import getFormErrorMessage from '@/components/ErrorTextMessage'
import { View } from '@/components/Themed'
import { DateFormatter } from '@/utils/helpers/Functions'
import { Input } from '@rneui/themed'
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
} from 'react-hook-form'

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
  const dateDialog = useCallback(() => {
    DateTimePickerAndroid.open({
      value: !field.value
        ? new Date(DateFormatter(new Date().toISOString()))
        : new Date(field.value),
      onChange: (event, selectedDate) => field.onChange(selectedDate),
      mode: 'date',
    })
  }, [field.value])

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
        variant='outlined'
        label={inputField.label}
        invalid={fieldState.invalid}
        value={DateFormatter(field.value.toString())}
        readOnly
        rightIcon={{
          type: 'material-community',
          name: 'calendar',
          onPress: () => {
            DateTimePickerAndroid.open({
              value: !field.value ? new Date() : new Date(field.value),
              onChange: (event, selectedDate) =>
                event.type === 'set' && field.onChange(selectedDate),
              mode: 'date',
            })
          },
        }}
        errorMessage={getFormErrorMessage(field.name, errors)}
        {...inputField.attr}
      ></Input>
    </View>
  )
}

export default BaseInputDate
