import React from 'react'
import { InferType } from 'yup'
import DynamicForm from '@/components/ui/form/dynamic-form'
import { loginSchema } from '@/utils/schemas/auth-schema'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { UserLogin, errorAuth } from '@/store/slices/auth-slices'
import { Redirect } from 'expo-router'
import {
  formState,
  resetFormState,
  setFormState,
} from '@/store/slices/config-slices'
import { Button, Input, Text, useTheme } from '@rneui/themed'
import { View } from '@/components/Themed'

const login = () => {
  const dispatch = useAppDispatch()
  const { theme, updateTheme } = useTheme()
  const authError = useAppSelector(errorAuth)
  const authLoading = useAppSelector((state) => state.auth.loading)
  const loginSuccess = useAppSelector((state) => state.auth.isLogged)
  const formStateRef = useAppSelector(formState)

  const onSubmit = async (data: InferType<typeof loginSchema>) => {
    const result = await dispatch(
      UserLogin({
        email: data.email,
        password: data.password,
      })
    ).unwrap()
    console.log('result', result)
    if (UserLogin.fulfilled.match(result)) {
      // redirect to dashboard.
      console.log('login success')
      dispatch(resetFormState())
    } else if (UserLogin.rejected.match(result)) {
      console.log('authError', authError)
      dispatch(
        setFormState({
          status: 'error',
          message: (result.payload as any).data.message ?? 'Error Auth',
        })
      )
    }
  }

  const field = [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      defaultValue: '',
      attr: {
        variant: 'outlined',
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
  ]
  return loginSuccess ? (
    <Redirect href={'/user-check'} />
  ) : (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
          }}
        >
          Selamat datang
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
          }}
        >
          Silahkan masukan akun yang sudah terdaftar untuk melanjutkan
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <DynamicForm
          fields={field}
          schema={loginSchema}
          formState={{
            ...formStateRef,
            isLoading: authLoading,
          }}
          submitText='Masuk'
          onSubmit={onSubmit}
          onReject={(data) => {
            console.log('onReject', data)
          }}
        />
        {/* <Button onPress={() => themeContext.toggleTheme()}>Ganti tema</Button> */}
      </View>
      <Button
        onPress={() =>
          updateTheme({
            mode: theme.mode === 'dark' ? 'light' : 'dark',
          })
        }
      >
        Ganti Theme
      </Button>
    </View>
  )
}

// const renderIcon = (props: any): React.ReactElement => (
//   <TouchableWithoutFeedback onPress={() => props.toggleSecureEntry()}>
//     <Icon name={'eye'} />
//   </TouchableWithoutFeedback>
// )

export default login
