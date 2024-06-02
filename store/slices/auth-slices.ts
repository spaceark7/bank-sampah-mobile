import { AuthApi } from '@/services/auth/AuthApi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginParam } from '../auth-types'
import { LoginDTO } from '@/utils/dto/auth'
import LocalStorage from '@/hooks/secure-store/secure-store'
// import { LocalStorageService } from '@/hooks/SecureStorage/useLocalStorage'

type AuthState = {
  token: string
  isLogged: boolean
  loading: boolean
  error: string | null
  isInit: boolean
}

const initialState: AuthState = {
  token: LocalStorage.getSync('token') || '',
  isLogged: false,
  loading: false,
  error: null,
  isInit: true,
}

export const UserLogin = createAsyncThunk<LoginDTO, LoginParam>(
  'auth/login',
  async (data: LoginParam, { rejectWithValue }) => {
    try {
      const response = await AuthApi.login(data)
      console.log('UserLogin:data', response)
      if (response.status) {
        console.log('UserLogin:response', response)
        await LocalStorage.save('token', response.data.token)
        return response
      }
      return rejectWithValue({
        data: {
          message: response.message,
          status: response.status,
        },
      })
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const UserLogout = createAsyncThunk(
  'auth/logout',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, { rejectWithValue }) => {
    try {
      await LocalStorage.removeItem('token')
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isLogged = true
      state.token = action.payload.data.token
      state.isInit = false
    },
    loginFailed: (state, action) => {
      state.loading = false
      state.isLogged = false
      state.error = action.payload
    },
    logout: (state, action) => {
      state.isLogged = false
      state.token = ''
      state.error = action.payload
    },
    register: (state) => {
      state.loading = true
    },
    registerSuccess: (state) => {
      state.loading = false
    },
    registerFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    resetInit: (state) => {
      state.isInit = false
    },
  },

  extraReducers: (builder) => {
    /**
     * Login Reducer
     */
    builder.addCase(UserLogin.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(UserLogin.fulfilled, (state, action) => {
      state.loading = false
      state.isLogged = true
      console.log('UserLogin.fulfilled:action', action.payload)
      state.token = action.payload.data.token
    })
    builder.addCase(UserLogin.rejected, (state, action) => {
      console.log('UserLogin.rejected:action', action.payload)
      state.loading = false
      state.error = (action.payload as any)?.data
        ? ((action.payload as any).data.message as string)
        : (action.error.message as string)
    })
    /**
     * Logout Reducer
     * */
    builder.addCase(UserLogout.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(UserLogout.fulfilled, (state) => {
      state.loading = false
      state.isLogged = false
      state.token = ''
    })
    builder.addCase(UserLogout.rejected, (state) => {
      state.loading = false
      state.error = 'Invalid credentials'
    })
  },
})

export const errorAuth = (state: { auth: { error: string | null } }) =>
  state.auth.error

export const loading = (state: { auth: { loading: boolean } }) =>
  state.auth.loading

export const { login, loginSuccess, loginFailed, logout, setToken, resetInit } =
  authSlices.actions
export default authSlices.reducer
