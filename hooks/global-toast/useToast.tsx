import Toast from 'react-native-root-toast'
import { useTheme } from '@ui-kitten/components'

interface ToastParams {
  message: string
  type: 'error' | 'success' | 'info' | 'warning'
  position?: number
}

const useToast = () => {
  const theme = useTheme()
  const showToast = ({
    message,
    type,
    position = Toast.positions.TOP + 20,
  }: ToastParams) => {
    Toast.show(message, {
      position: position,
      duration: Toast.durations.LONG,
      backgroundColor:
        type === 'success'
          ? theme['color-success-100']
          : type === 'error'
          ? theme['color-danger-100']
          : type === 'warning'
          ? theme['color-warning-100']
          : type === 'info'
          ? theme['color-info-100']
          : theme['color-primary-100'],
      textColor:
        type === 'success'
          ? theme['color-success-500']
          : type === 'error'
          ? theme['color-danger-500']
          : type === 'warning'
          ? theme['color-warning-500']
          : type === 'info'
          ? theme['color-info-500']
          : theme['color-primary-500'],
    })
  }
  return { showToast }
}

export default useToast
