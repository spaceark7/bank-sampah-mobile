import LocalStorage from '@/hooks/secure-store/secure-store'

// import { clearSecureStorage } from '@/hooks/SecureStorage/useLocalStorage'
import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from '@reduxjs/toolkit'
import {
  setFormState,
  showErrorMessage,
  showToast,
} from '../slices/config-slices'
import { UserLogin, loginFailed, logout } from '../slices/auth-slices'

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.log('action', action)
      if (UserLogin.rejected.match(action)) {
        if ('data' in (action.payload as any)) {
          console.info('Network Error!')
          console.info('Message:', action.payload)
          api.dispatch(
            setFormState({
              status: 'error',
              message: (action.payload as any).data.message,
            })
          )
          api.dispatch(loginFailed((action.payload as any).data.message))
          return next((action.payload as any).data.message)
        } else {
          const { message } = action.payload as any
          console.info('Bad Authentication!')
          console.info('Message:', action.payload)
          api.dispatch(
            setFormState({
              status: 'error',
              message: message,
            })
          )
          api.dispatch(loginFailed(message))
          return next((action.payload as any).data.message)
        }
      }
      const { message, status } = action.payload.data
      // const err = action.error?.message

      console.info('We got a rejected action!')
      console.info('Message:', action.payload)
      if (message === 'Unauthorized' && status === false) {
        api.dispatch(
          showToast({
            message: 'Sesi telah berakhir. Silahkan login kembali',
          })
        )
        api.dispatch(logout('Sesi telah berakhir. Silahkan login kembali'))
        LocalStorage.removeItem('token')
        // clearSecureStorage()
      }
    }

    return next(action)
  }
