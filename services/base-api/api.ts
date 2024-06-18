import { RootState } from '@/store/store'
import type { Action } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { REHYDRATE } from 'redux-persist'
import { UserEntity } from '../users/user-entity'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userHydrationAction = (
  action: Action
): action is Action<typeof REHYDRATE> & {
  key: string
  payload: { user: UserEntity }
  err: unknown
} => {
  return action.type === REHYDRATE
}

const apiUrl = process.env.EXPO_PUBLIC_BASE_API_URL
// Create a base API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: [
    'User',
    'Transaction',
    'Material',
    'AdminUser',
    'Member',
    'Dashboard',
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl as string,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      console.log('prepareHeaders', token)
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        headers.set('Content-Type', 'application/json')
      }
      return headers
    },
    timeout: 15000,
  }),
  // extractRehydrationInfo(action, { reducerPath }): any {
  //   if (userHydrationAction(action)) {
  //     if (action.key === 'User') {
  //       console.log('extractRehydrationInfo', action.payload.user)
  //       return {
  //         data: action.payload.user,
  //         reducerPath: reducerPath,
  //         type: 'User',
  //       }
  //     }
  //     console.log('extractRehydrationInfo', action)
  //     return action.payload.user
  //   }
  //   return undefined
  // },
  endpoints: () => ({}),
})
