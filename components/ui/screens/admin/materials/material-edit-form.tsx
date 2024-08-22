import { Text, View } from '@/components/Themed'
import DynamicForm from '@/components/ui/form/dynamic-form'
import GlobalModalService from '@/components/ui/modal/global-modal'
import useToast from '@/hooks/global-toast/useToast'
import {
  useDeleteMaterialMutation,
  useGetMaterialDetailQuery,
  useUpdateMaterialMutation,
} from '@/services/material/material-slices'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { formState, setFormState } from '@/store/slices/config-slices'
import { materialSchemaCreate } from '@/utils/schemas/material-schema'
import { Button } from '@rneui/themed'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { InferType } from 'yup'

interface MaterialEditFormProps {
  materialId?: string
}
const MaterialEditForm = ({ materialId }: MaterialEditFormProps) => {
  const [visible, setVisible] = React.useState(false)
  const formStateRef = useAppSelector(formState)
  const { showToast } = useToast()
  const dispatch = useAppDispatch()

  //#region Action Hooks
  const [updateMaterial, { isLoading: isUpdateLoading }] =
    useUpdateMaterialMutation()
  const [deleteMaterial] = useDeleteMaterialMutation()
  const { data: material, isSuccess } = useGetMaterialDetailQuery(
    materialId as string,
    {
      skip: !materialId,
    }
  )
  //#endregion

  //* Data
  const field = [
    {
      name: 'name',
      label: 'Nama Material',
      type: 'text',
      defaultValue: material?.data.name,
    },
    {
      name: 'base_price',
      type: 'currency',
      label: 'Harga Dasar',
      defaultValue: material?.data.base_price,
    },
    {
      name: 'unit',
      label: 'Unit',
      type: 'text',
      defaultValue: material?.data.unit,
      attr: {
        disabled: false,
      },
    },
  ]
  //#region Methods
  const fnSubmit = async (data: InferType<typeof materialSchemaCreate>) => {
    try {
      const result = await updateMaterial({
        id: materialId as string,
        name: data.name,
        base_price: data.base_price,
        is_active: data.is_active,
        unit: data.unit,
      })
        .unwrap()
        .then((res) => res)

      if (result) {
        showToast({
          message: 'Berhasil mengupdate material',
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

  const onDeactivate = async () => {
    try {
      const result = await deleteMaterial(materialId as string)
        .unwrap()
        .then((res) => res)

      if (result) {
        showToast({
          message: 'Berhasil menghapus material',
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
    <>
      <ScrollView>
        <View style={styles.container}>
          {isSuccess && (
            <>
              <DynamicForm
                schema={materialSchemaCreate}
                formState={{
                  ...formStateRef,
                  isLoading: isUpdateLoading,
                }}
                submitText='Update Material'
                fields={field}
                onSubmit={fnSubmit}
                onReject={(data) => {
                  console.log('onReject', data)
                }}
              />
              <Button onPress={() => setVisible(true)} color={'error'} outlined>
                Hapus Material
              </Button>
            </>
          )}
        </View>
        <GlobalModalService
          visible={visible}
          onBackdropPress={() => setVisible(false)}
          buttonTitle='Hapus'
          action={onDeactivate}
          title={`Hapus Material`}
        >
          <Text variants='body2'>
            Yakin ingin menghapus material ini? Material yang dihapus tidak akan
            muncul di daftar material.
          </Text>
        </GlobalModalService>
      </ScrollView>
    </>
  )
}

export default MaterialEditForm

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})
