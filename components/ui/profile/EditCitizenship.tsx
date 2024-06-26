import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import DynamicForm from '../form/dynamic-form'
import { UserCitizenSchema } from '@/utils/schemas/user-schema'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { formState, setFormState } from '@/store/slices/config-slices'
import { useGetUserDetailQuery } from '@/services/users/user-slices'
import { Redirect, router } from 'expo-router'
import { InferType } from 'yup'
import useToast from '@/hooks/global-toast/useToast'
import { useUpdateMemberIdentityMutation } from '@/services/members/member-slices'
import { Text, View } from '@/components/Themed'

const EditCitizenshipForm = () => {
  const formStateRef = useAppSelector(formState)
  const { showToast } = useToast()
  const dispatch = useAppDispatch()
  const { data: user, isLoading, isSuccess, isError } = useGetUserDetailQuery()
  const [updateMember, { isLoading: isUpdateLoading }] =
    useUpdateMemberIdentityMutation()

  //* Data
  const field = [
    {
      name: 'nik_number',
      label: 'Nomor NIK',
      type: 'text',
      defaultValue: user?.user_detail.citizenship?.nik_number,
      attr: {
        disabled: false,
        keyboardType: 'number-pad',
      },
    },
    {
      name: 'family_id_number',
      type: 'text',
      label: 'No. KK',
      defaultValue: user?.user_detail.citizenship?.family_id_number,
      attr: {
        disabled: false,
        keyboardType: 'number-pad',
      },
    },
    {
      name: 'gender',
      type: 'select',
      label: 'Jenis Kelamin',
      defaultValue: user?.user_detail.citizenship?.gender,
      placeholder: 'Pilih Jenis Kelamin',
      options: [
        { label: 'Laki-laki', value: 'Male' },
        {
          label: 'Perempuan',
          value: 'Female',
        },
      ],
    },
    {
      name: 'birth_place',
      type: 'text',
      label: 'Tempat Lahir',
      defaultValue: user?.user_detail.citizenship?.birth_place,
    },
    {
      name: 'birth_date',
      type: 'date',
      label: 'Tanggal Lahir',
      defaultValue: user?.user_detail.citizenship?.birth_date,
    },

    {
      name: 'marital_status',
      type: 'select',
      label: 'Status Pernikahan',
      placeholder: 'Pilih Status',

      defaultValue: user?.user_detail.citizenship?.marital_status,
      options: [
        { label: 'Lajang', value: 'Single' },
        { label: 'Menikah', value: 'Married' },
        { label: 'Cerai', value: 'Divorced' },
      ],
    },

    {
      type: 'separator',
      label: 'Alamat',
    },
    {
      name: 'address.address',
      type: 'text',
      label: 'Jalan',
      defaultValue: user?.user_detail.citizenship?.address?.address,
    },
    {
      name: 'address.village',
      type: 'text',
      label: 'Desa/Kelurahan',
      defaultValue: user?.user_detail.citizenship?.address?.village,
    },
    {
      name: 'address.district',
      type: 'text',
      label: 'Kecamatan',
      defaultValue: user?.user_detail.citizenship?.address?.district,
    },

    {
      name: 'address.city',
      type: 'text',
      label: 'Kota',
      defaultValue: user?.user_detail.citizenship?.address?.city,
    },
    {
      name: 'address.province',
      type: 'text',
      label: 'Provinsi',
      defaultValue: user?.user_detail.citizenship?.address?.province,
    },
    {
      name: 'address.postal_code',
      type: 'text',
      label: 'Kode Pos',
      defaultValue: user?.user_detail.citizenship?.address?.postal_code,
      attr: {
        disabled: false,
        keyboardType: 'number-pad',
      },
    },
  ]

  const fnSubmit = async (data: InferType<typeof UserCitizenSchema>) => {
    console.log('fnSubmit', data)
    try {
      const result = await updateMember({
        ...data,
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
      <View
        style={{
          flex: 1,
          padding: 10,
        }}
      >
        {isError && <Redirect href='/(user)/profile' />}
        {isLoading && <Text>Loading...</Text>}
        {isSuccess && (
          <DynamicForm
            schema={UserCitizenSchema}
            formState={{
              ...formStateRef,
              isLoading: isUpdateLoading,
            }}
            submitText='Update Data'
            fields={field}
            onSubmit={fnSubmit}
            onReject={(data) => {
              console.log('onReject', data)
            }}
            showToastError
          />
        )}
      </View>
    </ScrollView>
  )
}

export default EditCitizenshipForm

const styles = StyleSheet.create({
  container: {},
})
