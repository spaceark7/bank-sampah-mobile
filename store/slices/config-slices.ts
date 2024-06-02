import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type errMessage = {
  message: string
  visible: boolean
}

type formState = {
  status: 'initial' | 'loading' | 'success' | 'error'
  message?: string | string[]
}
interface ConfigState {
  // Add your config state properties here
  theme: string
  language: string
  toast_open: boolean
  toast: {
    isOpen: boolean
    message?: string
  }
  formState?: formState
  toast_detail: {
    severity?: 'success' | 'info' | 'warn' | 'error' | undefined
    summary: string
    detail: string
  }
  err_message: errMessage
}

const initialState: ConfigState = {
  theme: 'light',
  language: 'id',
  toast_open: false,
  toast: {
    isOpen: false,
  },
  formState: {
    status: 'initial',
  },
  toast_detail: {
    severity: undefined,
    summary: '',
    detail: '',
  },
  err_message: {
    message: '',
    visible: false,
  },
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },

    setFormState: (state, action: PayloadAction<formState>) => {
      state.formState = action.payload
    },
    resetFormState: (state) => {
      state.formState = {
        status: 'initial',
      }
    },
    showToast: (
      state,
      action: PayloadAction<{
        message: string
      }>
    ) => {
      console.log('showToast', action.payload)
      state.toast_open = true
      state.toast = {
        isOpen: true,
        message: action.payload.message,
      }
    },

    resetToast: (state) => {
      state.toast = {
        isOpen: false,
      }
      state.toast_open = false
    },
    showErrorMessage: (state, action: PayloadAction<string>) => {
      console.log('showErrorMessage', action.payload)
      state.err_message.message = action.payload
      state.err_message.visible = true
    },
    hideErrorMessage: (state) => {
      console.log('hideErrorMessage')
      state.err_message.message = ''
      state.err_message.visible = false
    },
  },
})

export const getConfig = (state: { config: ConfigState }) => state.config
export const selectToastState = (state: { config: ConfigState }) =>
  state.config.toast.isOpen
export const selectToastMessage = (state: { config: ConfigState }) => {
  return state.config.toast
}
export const selectToastDetail = (state: { config: ConfigState }) =>
  state.config.toast_detail
export const selectErrorMessage = (state: { config: ConfigState }) =>
  state.config.err_message
export const formState = (state: { config: ConfigState }) =>
  state.config.formState

export const {
  setTheme,
  setLanguage,
  showToast,
  showErrorMessage,
  hideErrorMessage,
  resetFormState,
  setFormState,

  resetToast,
} = configSlice.actions
export default configSlice.reducer
