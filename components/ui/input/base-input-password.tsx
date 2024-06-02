import React from 'react'

import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
} from 'react-hook-form'
import { TextInputProps, TouchableWithoutFeedback } from 'react-native'
import getFormErrorMessage from '@/components/ErrorTextMessage'
import { View } from '@/components/Themed'
import { Input, useTheme } from '@rneui/themed'
import { Icon } from '@rneui/themed'

interface BaseInputPasswordProps extends TextInputProps {
  field: ControllerRenderProps<FieldValues, any>
  fieldState: ControllerFieldState
  inputField: any
  errors: FieldErrors<FieldValues>
}

const BaseInputPassword = ({
  field,
  inputField,
  fieldState,
  errors,
  ...rest
}: BaseInputPasswordProps) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)
  const { theme } = useTheme()
  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry)
  }
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
        value={field.value}
        invalid={fieldState.invalid}
        onChangeText={(data) => field.onChange(data)}
        errorMessage={getFormErrorMessage(field.name, errors)}
        secureTextEntry={secureTextEntry}
        rightIcon={() => (
          <Icon
            type='ionicon'
            name={secureTextEntry ? 'eye' : 'eye-off'}
            onPress={toggleSecureEntry}
            color={theme.colors.shade500}
          />
        )}
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

// const RenderIcon = (props: {
//   action: () => void
//   data: any
//   state: boolean
// }): React.ReactElement => (
//   <TouchableWithoutFeedback onPress={props.action}>
//     <Icon {...props.data} name={props.state ? 'eye' : 'eye-off'} />
//   </TouchableWithoutFeedback>
// )

export default BaseInputPassword
