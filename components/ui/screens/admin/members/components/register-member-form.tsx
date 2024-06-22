import { StyleSheet } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  formState,
  setFormState,
  showToast,
} from '@/store/slices/config-slices'
import { RegisterSchema } from '@/utils/schemas/user-schema'
import DynamicForm from '@/components/ui/form/dynamic-form'
import { InferType } from 'yup'
import { useCreateMemberMutation } from '@/services/members/member-slices'
import Toast from 'react-native-root-toast'

interface RegisterFormProps {
  onCallback?: () => void
  setUserId: (id: string) => void
}

const RegisterForm = ({ onCallback, setUserId }: RegisterFormProps) => {
  const formStateRef = useAppSelector(formState)
  const dispatch = useAppDispatch()
  const [
    createMember,
    {
      isLoading: isCreateLoading,

      error: createError,
    },
  ] = useCreateMemberMutation()
  //* Data
  const field = [
    {
      name: 'user_detail.first_name',
      label: 'Nama Depan',
      type: 'text',
    },
    {
      name: 'user_detail.last_name',
      type: 'text',
      label: 'Nama Belakang',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      attr: {
        disabled: false,
      },
    },
    {
      name: 'phone_number',
      type: 'text',
      label: 'No. Telepon',
      attr: {
        disabled: false,
        keyboardType: 'number-pad',
      },
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      defaultValue: '',
      containerStyle: {
        width: '100%',
      },
      attr: {
        variant: 'outlined',
      },
    },
    {
      name: 'confirm_password',
      type: 'password',
      label: 'Konfirmasi Password',
      defaultValue: '',
      containerStyle: {
        width: '100%',
      },
      attr: {
        variant: 'outlined',
      },
    },
  ]

  //* Methods
  const fnHandleSubmit = async (data: InferType<typeof RegisterSchema>) => {
    console.log('fnHandleSubmit', data)
    try {
      const res = await createMember(data)
        .unwrap()
        .then((res) => res)
      console.log('fnHandleSubmit:res', res)

      if (res.status && onCallback) {
        dispatch(
          showToast({
            message: 'Berhasil membuat akun',
            type: 'success',
            summary: 'Sukses',
          })
        )
        setUserId(res.data.id)
        onCallback()
      } else if (!res.status) {
        console.log('createError', createError)
        throw new Error(res.message)
      }
    } catch (error: any) {
      console.log('error', error)
      dispatch(
        setFormState({
          status: 'error',
          message: 'data' in error ? error.data.message : 'Gagal membuat akun',
        })
      )
    }
  }

  return (
    <DynamicForm
      schema={RegisterSchema}
      formState={{
        ...formStateRef,
        isLoading: isCreateLoading,
      }}
      submitText='Buat Akun'
      fields={field}
      onSubmit={fnHandleSubmit}
      onReject={(data: any) => {
        console.log('onReject', data)
      }}
      showToastError
    />
  )
}

export default RegisterForm

const styles = StyleSheet.create({})
