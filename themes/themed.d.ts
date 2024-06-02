// themed.d.ts
import '@rneui/themed'

declare module '@rneui/themed' {
  export interface Colors {
    secondary: string
    info: string
    success: string
    danger: string
    surface: string
    blue: string
    green: string
    yellow: string
    cyan: string
    pink: string
    indigo: string
    teal: string
    orange: string
    bluegray: string
    purple: string
    red: string
    primaryLight: string
    primaryTextColor: string
    successTextColor: string
    secondaryTextColor: string
    dangerTextColor: string
    warningTextColor: string
    infoTextColor: string
    infoMessageBg: string
    successMessageBg: string
    dangerMessageBg: string
    warningMessageBg: string
    shade000: string
    shade100: string
    shade200: string
    shade300: string
    shade400: string
    shade500: string
    shade600: string
    shade700: string
    shade800: string
    shade900: string
  }

  export interface InputProps {
    invalid?: boolean
    size?: string
    variant?: 'filled' | 'outlined'
    showIcon?: boolean
  }

  export interface ButtonProps {
    outlined?: boolean
    text?: boolean
    rounded?: boolean
  }

  export interface ComponentTheme {
    Input: Partial<InputProps>
    Button: Partial<ButtonProps>
  }
}
