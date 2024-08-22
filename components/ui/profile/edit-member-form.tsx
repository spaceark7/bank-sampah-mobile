import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { formState, setFormState } from '@/store/slices/config-slices'
import useToast from '@/hooks/global-toast/useToast'
import {
  useGetMemberByIdQuery,
  useUpdateMemberMutation,
} from '@/services/members/member-slices'
import { InferType } from 'yup'
import { UpdateUserSchema } from '@/utils/schemas/user-schema'
import { Redirect, router } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import DynamicForm from '../form/dynamic-form'

type EditMemberFormProps = {
  memberId: string
}

const EditMemberForm = ({ memberId }: EditMemberFormProps) => {
  const formStateRef = useAppSelector(formState)
  const { showToast } = useToast()
  const dispatch = useAppDispatch()
  const {
    data: member,
    isLoading,
    isSuccess,
    isError,
  } = useGetMemberByIdQuery(memberId)
  const [updateMember, { isLoading: isUpdateLoading }] =
    useUpdateMemberMutation()

  //* Data
  const field = [
    {
      name: 'user_detail.first_name',
      label: 'Nama Depan',
      type: 'text',
      defaultValue: member?.data.user_detail.first_name,
    },
    {
      name: 'user_detail.last_name',
      type: 'text',
      label: 'Nama Belakang',
      defaultValue: member?.data.user_detail.last_name,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      defaultValue: member?.data.email,
      attr: {
        disabled: true,
      },
    },
    {
      name: 'phone_number',
      type: 'text',
      label: 'No. Telepon',
      attr: {
        disabled: true,
      },
      defaultValue: member?.data.phone_number,
    },
  ]

  const fnSubmit = async (data: InferType<typeof UpdateUserSchema>) => {
    try {
      const result = await updateMember({
        id: memberId,
        user_detail: {
          first_name: data.user_detail.first_name,
          last_name: data.user_detail.last_name,
        },
        email: data.email,
        phone_number: data.phone_number,
      })
        .unwrap()
        .then((res) => res)

      if (result) {
        showToast({
          message: 'Berhasil update profile',
          type: 'success',
          position: 'bottom',
        })
        router.dismiss()
      }
    } catch (error) {
      dispatch(
        setFormState({
          status: 'error',
          message: (error as any).data.message,
        })
      )
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        {isError && <Redirect href='/(admin)/profile' />}
        {isLoading && <Text>Loading...</Text>}
        {isSuccess && (
          <DynamicForm
            schema={UpdateUserSchema}
            formState={{
              ...formStateRef,
              isLoading: isUpdateLoading,
            }}
            submitText='Update Profile'
            fields={field}
            onSubmit={fnSubmit}
            onReject={(data) => {
              console.log('onReject', data)
            }}
          />
        )}
      </View>
    </ScrollView>
  )
}

export default EditMemberForm

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})
