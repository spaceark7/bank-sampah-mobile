import React, { useEffect } from 'react'

import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
} from 'react-hook-form'
import { TextInputProps, View } from 'react-native'
import getFormErrorMessage from '@/components/ErrorTextMessage'
import { Input } from '@rneui/themed'
import { Text } from '@/components/Themed'
import { useTheme } from '@rneui/themed'
import { CurrencyFormatter } from '@/utils/types'

interface BaseInputCurrencyProps extends TextInputProps {
  field: ControllerRenderProps<FieldValues, any>
  fieldState: ControllerFieldState
  inputField: any
  errors: FieldErrors<FieldValues>
}

const BaseInputCurrency = ({
  field,
  inputField,
  fieldState,
  errors,
  ...rest
}: BaseInputCurrencyProps) => {
  const { theme } = useTheme()
  const [maskedInput, setMaskedInput] = React.useState<string>(
    CurrencyFormatter(field.value)
  )

  useEffect(() => {
    setMaskedInput(CurrencyFormatter(field.value))
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
      <Input
        variant='outlined'
        id={field.name}
        label={inputField.label}
        invalid={fieldState.invalid}
        placeholder={inputField.placeholder ?? `Masukan ${inputField.label}`}
        value={maskedInput}
        // leftIcon={
        //   <Text
        //     style={{
        //       color:
        //         theme.mode === 'dark'
        //           ? theme.colors.shade500
        //           : theme.colors.shade500,
        //     }}
        //   >
        //     Rp
        //   </Text>
        // }
        keyboardType='numeric'
        onChangeText={(data: string) => {
          console.log('onChangeText', data.toString())

          field.onChange(parseInt(data.replace(/\D/g, ''), 10))
          //   field.onChange(data)
        }}
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

export default BaseInputCurrency
