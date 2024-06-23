import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import DynamicForm from '../form/dynamic-form'
import { UpdateUserSchema } from '@/utils/schemas/user-schema'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { formState, setFormState } from '@/store/slices/config-slices'
import { useGetUserDetailQuery, useUpdateAdminUserMutation } from '@/services/users/user-slices'
import { Redirect, router } from 'expo-router'
import { InferType } from 'yup'
import useToast from '@/hooks/global-toast/useToast'
import { useUpdateMemberMutation } from '@/services/members/member-slices'
import { Text, View } from '@/components/Themed'

const EditForm = () => {
  const formStateRef = useAppSelector(formState)
  const { showToast } = useToast()
  const dispatch = useAppDispatch()
  const { data: user, isLoading, isSuccess, isError } = useGetUserDetailQuery()
  const [updateUser, { isLoading: isUpdateLoading }] =
    useUpdateAdminUserMutation()

  //* Data
  const field = [
    {
      name: 'user_detail.first_name',
      label: 'Nama Depan',
      type: 'text',
      defaultValue: user?.user_detail.first_name,
    },
    {
      name: 'user_detail.last_name',
      type: 'text',
      label: 'Nama Belakang',
      defaultValue: user?.user_detail.last_name,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      defaultValue: user?.email,
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
      defaultValue: user?.phone_number,
    },
  ]

  const fnSubmit = async (data: InferType<typeof UpdateUserSchema>) => {
    try {
      const result = await updateUser({
        id: user?.id as string,
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
        {isError && <Redirect href='/(user)/profile' />}
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

export default EditForm

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})
