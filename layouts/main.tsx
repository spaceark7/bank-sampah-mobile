import { TouchableOpacity, useColorScheme } from 'react-native'

import React, { useEffect } from 'react'
import { ThemeProvider } from '@react-navigation/native'
import { Icon, ThemeProvider as RNETheme, useTheme } from '@rneui/themed'
import { Stack, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

import { DarkTheme, DefaultTheme } from '@/themes/foundation'
import { ModalService } from '@ui-kitten/components'
import { default as themeFile } from '@/themes/theme.json'
import { ThemeContext } from '@/themes/theme-context'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { RootSiblingParent } from 'react-native-root-siblings'
import useSecureStore from '@/hooks/secure-store'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginSuccess, resetInit } from '@/store/slices/auth-slices'
import {
  resetFormState,
  resetToast,
  selectToastMessage,
  selectToastState,
} from '@/store/slices/config-slices'
import Toast from 'react-native-root-toast'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { rnuiTheme } from '@/themes/rnui-theme'
ModalService.setShouldUseTopInsets = true

const MainLayout = () => {
  const colorScheme = useColorScheme()
  rnuiTheme.mode = colorScheme === 'dark' ? 'dark' : 'light'
  const [theme, setTheme] = React.useState('light')
  const { theme: baseTheme } = useTheme()
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
  }
  const toastState = useAppSelector((state) => state.config.toast_open)
  const toastMessage = useAppSelector(selectToastMessage)

  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.auth.token)
  // State token

  useEffect(() => {
    if (token) {
      dispatch(
        loginSuccess({
          data: {
            token,
          },
        })
      )
    } else {
      dispatch(resetInit())
      dispatch(resetFormState())
    }
  }, [token])

  useEffect(() => {
    if (toastState) {
      Toast.show(toastMessage.message as string, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        onHide: () => {
          // calls on toast\`s hide animation start.
          dispatch(resetToast())
        },
      })
    }
  }, [toastState])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <RNETheme theme={rnuiTheme}>
        <StatusBar
          backgroundColor={
            colorScheme === 'dark'
              ? rnuiTheme.darkColors?.background
              : rnuiTheme.lightColors?.background
          }
          style={'auto'}
        />
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <SafeAreaProvider>
            <RootSiblingParent>
              <StackRouter />
            </RootSiblingParent>
          </SafeAreaProvider>
        </ThemeProvider>
      </RNETheme>
      {/* <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        // theme={{
        //   ...eva.light,
        //   ...themeFile,
        // }}
        theme={{
          ...(eva as any)['light'],
          ...(themeFile as any)['light'],
        }}
      >
        <ThemeProvider
          // value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          value={DefaultTheme}
        >
          <SafeAreaProvider>
            <RootSiblingParent>
              <StackRouter />
            </RootSiblingParent>
          </SafeAreaProvider>
        </ThemeProvider>
      </ApplicationProvider> */}
    </ThemeContext.Provider>
  )
}

const StackRouter = () => {
  const router = useRouter()
  const { theme } = useTheme()
  const _token = useAppSelector((state) => state.auth.token)

  // State token

  useEffect(() => {
    if (_token) {
      router.replace('/user-check')
    } else {
      router.replace('/login')
    }
  }, [_token])

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)/user-check' options={{ headerShown: false }} />
      <Stack.Screen
        name='login'
        options={{
          title: '',
          headerShadowVisible: false,

          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerLeft: () => (
            // <Ionicons
            //   name='arrow-back'
            //   size={24}
            //   style={{ padding: 28  , backgroundColor: theme.colors.primary }}
            //   color={theme.colors.primaryTextColor}
            //   onPress={() => {
            //     console.log('back')
            //     router.push('/')
            //   }}
            // />
            <Icon
              name='arrow-back'
              size={24}
              style={{ padding: 28 }}
              color={theme.colors.primaryTextColor}
              onPress={() => {
                router.push('/')
              }}
            />
          ),
        }}
      />
      {/* <Stack.Screen name='(tabs)' options={{ headerShown: false }} /> */}
      <Stack.Screen name='(admin)' options={{ headerShown: false }} />
      <Stack.Screen name='(user)' options={{ headerShown: false }} />
      <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
      <Stack.Screen name='edit-modal' options={{ presentation: 'modal' }} />
      <Stack.Screen
        name='(members)/member-detail'
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}

export default MainLayout
