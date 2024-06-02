import React from 'react'

import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
} from 'react-hook-form'
import { TextInputProps, View } from 'react-native'
import getFormErrorMessage from '@/components/ErrorTextMessage'
import { Input } from '@rneui/themed'

interface BaseInputTextProps extends TextInputProps {
  field: ControllerRenderProps<FieldValues, any>
  fieldState: ControllerFieldState
  inputField: any
  errors: FieldErrors<FieldValues>
}

const BaseInputText = ({
  field,
  inputField,
  fieldState,
  errors,
  ...rest
}: BaseInputTextProps) => {
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
      <Input
        id={field.name}
        label={inputField.label}
        invalid={fieldState.invalid}
        value={field.value}
        onChangeText={(data: any) => field.onChange(data)}
        errorMessage={getFormErrorMessage(field.name, errors)}
        {...inputField.attr}
        // className={classNames(
        //   {
        //     'p-invalid': fieldState.invalid,
        //   },
        //   inputField.inputClassName || 'w-full'
        // )}
      ></Input>
    </View>
  )
}

export default BaseInputText
