import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type errMessage = {
  message: string
  visible: boolean
}

type formState = {
  status: 'initial' | 'loading' | 'success' | 'error'
  message?: string
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

const utilSlices = createSlice({
  name: 'config',
  initialState,
  reducers: {
    
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
  
} = utilSlices.actions
export default utilSlices.reducer
