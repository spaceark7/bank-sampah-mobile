import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm, Control, FieldErrors } from 'react-hook-form'
import { ScrollView } from 'react-native'
import BaseInputText from '@/components/ui/input/base-input-text'
import BaseInputPassword from '../input/base-input-password'
import Message from '../message/Message'
import { useAppDispatch } from '@/store/hooks'
import { resetFormState, setFormState } from '@/store/slices/config-slices'
import BaseSelect from '../input/base-select'
import BaseInputDate from '../input/base-input-date'
import React from 'react'
import Toast from 'react-native-root-toast'
import { Text, View } from '@/components/Themed'
import { Button, Divider } from '@rneui/themed'

interface DynamicFormProps {
  schema: yup.AnyObjectSchema
  onSubmit: (data: any) => void
  onReject: (error: any) => void
  fields: any
  formState: any
  submitText?: string
  showToastError?: boolean
  toastMessage?: string | string[]
}

const DynamicForm: React.FC<DynamicFormProps> = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(props.schema),
    defaultValues: props.fields.reduce((acc: any, field: any) => {
      acc[field.name] = field.defaultValue || ''
      return acc
    }, {}),
  })

  const scrollRef = React.useRef(null)

  const dispatch = useAppDispatch()

  const Submit = handleSubmit(
    (data) => {
      props.onSubmit(data)
    },
    (error) => {
      const messages: string[] = []
      Object.values(error).forEach((err: any) => {
        if (err?.message) {
          messages.push(err.message)
        }
        if (typeof err === 'object') {
          Object.values(err).forEach((e: any) => {
            if (e?.message) {
              messages.push(e.message)
            }
          })
        }
      })

      if (props.showToastError) {
        Toast.show(messages.join('\n'), {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP + 30,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        })
      }

      dispatch(
        setFormState({
          status: 'error',
          message: messages.join('\n'),
        })
      )
      props.onReject(error)
    }
  )

  return (
    <ScrollView ref={scrollRef}>
      {props.formState.status === 'error' && (
        <Message
          message={props.formState.message}
          variant='error'
          style={{
            marginBottom: 10,
          }}
          onHide={() => {
            dispatch(resetFormState())
          }}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        {props.fields.map((inputField: any, index: number) => {
          return (
            <RenderField
              key={index}
              control={control}
              errors={errors}
              inputField={inputField}
              {...inputField}
            />
          )
        })}
      </View>
      <View
        style={{
          marginTop: 20,
          width: '100%',
        }}
      >
        <Button
          disabled={props.formState.isLoading || !isDirty}
          onPress={Submit}
        >
          {props.formState.isLoading
            ? 'Loading...'
            : props.submitText || 'Simpan'}
        </Button>
      </View>
    </ScrollView>
  )
}

const RenderField = ({
  inputField,
  control,
  errors,
}: {
  inputField: any
  control: Control
  errors: FieldErrors<any>
}) => {
  switch (inputField.type) {
    case 'text':
      return (
        <Controller
          name={inputField.name}
          control={control}
          render={({ field, fieldState }) => (
            <BaseInputText
              field={field}
              fieldState={fieldState}
              errors={errors}
              inputField={inputField}
            />
          )}
        />
      )
    case 'mask':
      return (
        <Controller
          name={inputField.name}
          control={control}
          render={({ field, fieldState }) => (
            <View>
              <Text>Comp</Text>
            </View>
          )}
        />
      )
    case 'radio':
      return (
        <Controller
          name={inputField.name}
          control={control}
          render={({ field, fieldState }) => (
            <View>
              <Text>Comp</Text>
            </View>
          )}
        />
      )
    case 'date':
      return (
        <Controller
          name={inputField.name}
          control={control}
          render={({ field, fieldState }) => (
            <BaseInputDate
              field={field}
              fieldState={fieldState}
              errors={errors}
              value={field.value}
              inputField={inputField}
            />
          )}
        />
      )
    case 'separator':
      return (
        <View
          style={{
            width: '100%',
          }}
        >
          <Text
            // category='h6'
            style={{
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            {inputField.label}
          </Text>
          <Divider />
        </View>
      )
    case 'password':
      return (
        <Controller
          name={inputField.name}
          control={control}
          render={({ field, fieldState }) => (
            <BaseInputPassword
              field={field}
              fieldState={fieldState}
              errors={errors}
              inputField={inputField}
            />
          )}
        />
      )
    case 'currency':
      return (
        <Controller
          name={inputField.name}
          control={control}
          render={({ field, fieldState }) => (
            <View>
              <Text>Comp</Text>
            </View>
          )}
        />
      )
    case 'switch':
      return (
        <Controller
          name={inputField.name}
          control={control}
          render={({ field, fieldState }) => (
            <View>
              <Text>Comp</Text>
            </View>
          )}
        />
      )

    case 'textarea':
      return (
        <View>
          <Text>Comp</Text>
        </View>
      )
    case 'select':
      return (
        <Controller
          name={inputField.name}
          control={control}
          render={({ field, fieldState }) => (
            <View>
              <Text>Comp</Text>
            </View>
          )}
        />
      )
    default:
      return (
        <View>
          <Text>Comp</Text>
        </View>
      )
  }
}

export default DynamicForm
