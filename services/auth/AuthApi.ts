import { LoginParam } from '@/store/auth-types'
import { Platform } from 'react-native'

export class AuthApi {
  static async login(param: LoginParam) {
    const apiUrl =
      Platform.OS === 'android'
        ? process.env.EXPO_PUBLIC_BASE_API_URL
        : process.env.EXPO_PUBLIC_BASE_API_URL_IOS
    try {
      const controller = new AbortController()
      const id = setTimeout(() => controller.abort(), 10000)
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
        signal: controller.signal,
      })

      clearTimeout(id)

      const data = await response.json()
      return data
    } catch (error: any) {
      if ('message' in error) {
        throw new Error(error.message as string)
      } else {
        console.log('error', error)
        throw new Error(error as string)
      }
    }
  }
}
