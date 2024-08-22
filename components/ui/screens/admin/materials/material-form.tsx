import { StyleSheet } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { formState, setFormState } from '@/store/slices/config-slices'
import useToast from '@/hooks/global-toast/useToast'
import { useCreateMaterialMutation } from '@/services/material/material-slices'
import { InferType } from 'yup'
import { materialSchemaCreate } from '@/utils/schemas/material-schema'
import { router } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { View } from '@/components/Themed'
import DynamicForm from '@/components/ui/form/dynamic-form'


const MaterialForm = () => {
  const formStateRef = useAppSelector(formState)
  const { showToast } = useToast()
  const dispatch = useAppDispatch()
  // const { data: user, isLoading, isSuccess, isError } = useGetUserDetailQuery()
  const [createMaterial, { isLoading: isUpdateLoading }] =
    useCreateMaterialMutation()

  //* Data
  const field = [
    {
      name: 'name',
      label: 'Nama Material',
      type: 'text',
      // defaultValue: user?.user_detail.first_name,
    },
    {
      name: 'base_price',
      type: 'currency',
      label: 'Harga Dasar',
      // defaultValue: user?.user_detail.last_name,
    },
    {
      name: 'unit',
      label: 'Unit',
      type: 'text',
      // defaultValue: user?.email,
      attr: {
        disabled: false,
      },
    },
    // {
    //   name: 'phone_number',
    //   type: 'text',
    //   label: 'No. Telepon',
    //   attr: {
    //     disabled: true,
    //   },
    //   // defaultValue: user?.phone_number,
    // },
  ]
//#region methods
  const fnSubmit = async (data: InferType<typeof materialSchemaCreate>) => {
    try {
      const result = await createMaterial({
        name: data.name,
        base_price: data.base_price,
        is_active: data.is_active,
        unit: data.unit,
      })
        .unwrap()
        .then((res) => res)

      if (result) {
        showToast({
          message: 'Berhasil menambahkan material',
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
  //#endregion
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* {isError && <Redirect href='/(user)/profile' />}
        {isLoading && <Text>Loading...</Text>}
        {isSuccess && (
          <DynamicForm
            schema={materialSchemaCreate}
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
        )} */}
        <DynamicForm
          schema={materialSchemaCreate}
          formState={{
            ...formStateRef,
            isLoading: isUpdateLoading,
          }}
          submitText='Tambah Material'
          fields={field}
          onSubmit={fnSubmit}
          onReject={(data) => {
            console.log('onReject', data)
          }}
        />
      </View>
    </ScrollView>
  )
}

export default MaterialForm

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})
