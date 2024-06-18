import { useTheme } from '@rneui/themed'
import Toast from 'react-native-root-toast'

interface ToastParams {
  message: string
  type: 'error' | 'success' | 'info' | 'warning'
  position?: number
}

const useToast = () => {
  const {theme} = useTheme()
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
          ? theme.colors.successMessageBg
          : type === 'error'
          ? theme.colors.dangerMessageBg
          : type === 'warning'
          ? theme.colors.warningMessageBg
          : type === 'info'
          ? theme.colors.infoMessageBg
          : theme.colors.background,
      textColor:
        type === 'success'
          ? theme.colors.successTextColor
          : type === 'error'
          ? theme.colors.dangerTextColor
          : type === 'warning'
          ? theme.colors.warningTextColor
          : type === 'info'
          ? theme.colors.infoTextColor
          : theme.colors.shade500,
    })
  }
  return { showToast }
}

export default useToast
