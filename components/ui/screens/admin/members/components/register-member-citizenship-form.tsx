import { Text } from '@/components/Themed'
import DynamicForm from '@/components/ui/form/dynamic-form'
import { useAddMemberIdentityMutation } from '@/services/members/member-slices'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  formState,
  setFormState,
  showToast,
} from '@/store/slices/config-slices'
import { UserCitizenSchema } from '@/utils/schemas/user-schema'
import { Stack, router } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import { InferType } from 'yup'

interface RegisterCitizenshipFormProps {
  userId: string
  onCallback?: () => void
}
const RegisterCitizenshipForm = ({
  userId,
  onCallback,
}: RegisterCitizenshipFormProps) => {
  const formStateRef = useAppSelector(formState)
  const dispatch = useAppDispatch()
  const [addMemberidentity] = useAddMemberIdentityMutation()
  //* Data
  const field = [
    {
      name: 'nik_number',
      label: 'Nomor NIK',
      type: 'text',
      attr: {
        disabled: false,
        keyboardType: 'number-pad',
      },
    },
    {
      name: 'family_id_number',
      type: 'text',
      label: 'No. KK',
      attr: {
        disabled: false,
        keyboardType: 'number-pad',
      },
    },
    {
      name: 'gender',
      type: 'select',
      label: 'Jenis Kelamin',
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
    },
    {
      name: 'birth_date',
      type: 'date',
      label: 'Tanggal Lahir',
    },

    {
      name: 'marital_status',
      type: 'select',
      label: 'Status Pernikahan',
      placeholder: 'Pilih Status',

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
    },
    {
      name: 'address.village',
      type: 'text',
      label: 'Desa/Kelurahan',
    },
    {
      name: 'address.district',
      type: 'text',
      label: 'Kecamatan',
    },

    {
      name: 'address.city',
      type: 'text',
      label: 'Kota',
    },
    {
      name: 'address.province',
      type: 'text',
      label: 'Provinsi',
    },
    {
      name: 'address.postal_code',
      type: 'text',
      label: 'Kode Pos',
      attr: {
        disabled: false,
        keyboardType: 'number-pad',
      },
    },
  ]

  const fnSubmit = async (data: InferType<typeof UserCitizenSchema>) => {
    console.log('fnSubmit', data)
    dispatch(setFormState({ status: 'loading' }))
    try {
      const result = await addMemberidentity({
        id: userId,
        data,
      })
        .unwrap()
        .then((res) => res)

      if (!result.status) {
        throw new Error(result.message)
      } else {
        onCallback && onCallback()
        dispatch(
          showToast({
            message: 'Berhasil menambahkan identitas',
            type: 'success',
            summary: 'Sukses',
          })
        )
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
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',

          presentation: 'modal',
          headerRight: () => {
            return (
              <Pressable onPress={() => router.dismiss()}>
                <Text variants='body2'>Lewati</Text>
              </Pressable>
            )
          },
        }}
      />
      <DynamicForm
        schema={UserCitizenSchema}
        formState={{
          ...formStateRef,
          isLoading: false,
        }}
        submitText='Simpan'
        fields={field}
        onSubmit={fnSubmit}
        onReject={(data) => {
          console.log('onReject', data)
        }}
        showToastError
      />
    </>
  )
}

export default RegisterCitizenshipForm
