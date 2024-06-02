import React from 'react'
import {
  Datepicker,
  DatepickerProps,
  Icon,
  IconElement,
  Input,
} from '@ui-kitten/components'

import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
} from 'react-hook-form'
import { View } from 'react-native'
import getFormErrorMessage from '@/components/ErrorTextMessage'

interface BaseInputDateProps extends DatepickerProps {
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
      <Datepicker
        label={inputField.label}
        id={field.name}
        status={
          fieldState.invalid
            ? 'danger'
            : fieldState.isTouched
            ? 'success'
            : 'basic'
        }
        min={new Date(1900, 0, 0)}
        max={new Date()}
        date={new Date(field.value)}
        onSelect={(data) => {
          field.onChange(data.toISOString())
        }}
        accessoryRight={CalendarIcon}
        caption={getFormErrorMessage(field.name, errors)}
        {...inputField.attr}
        // className={classNames(
        //   {
        //     'p-invalid': fieldState.invalid,
        //   },
        //   inputField.inputClassName || 'w-full'
        // )}
      />
    </View>
  )
}

const CalendarIcon = (props: any): IconElement => (
  <Icon {...props} name='calendar' />
)

export default BaseInputDate
