import { TextInputProps } from 'react-native'
// themed.d.ts
import '@rneui/themed'
import { StringOmit } from '@rneui/base'

declare module '@rneui/themed' {
  type FontWeight =
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | 'ultralight'
    | 'thin'
    | 'light'
    | 'medium'
    | 'regular'
    | 'semibold'
    | 'condensedBold'
    | 'condensed'
    | 'heavy'
    | 'black'
    | undefined
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
    textColor: string
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
    // * Global
    textSecondaryColor: string
    borderRadius: number
    divider: string
    maskBg: string
    errorColor: string
  }
  export interface Theme {
    global: {
      borderRadius: number
      containerPadding: number
    }
    typography: {
      h1: {
        fontSize: number
        fontWeight: FontWeight
        color: Colors
      }
      h2: {
        fontSize: number
        fontWeight: FontWeight
        color: Colors
      }
      h3: {
        fontSize: number
        fontWeight: FontWeight
        color: Colors
      }
      h4: {
        fontSize: number
        fontWeight: FontWeight
        color: Colors
      }
      h5: {
        fontSize: number
        fontWeight: FontWeight
        color: Colors
      }
      h6: {
        fontSize: number
        fontWeight: FontWeight
        color: Colors
      }
      subtitle1: {
        fontSize: number
        fontWeight: FontWeight
        color: Colors
      }
      subtitle2: {
        fontSize: number
        fontWeight: FontWeight
        color: Colors
      }
      body1: {
        fontSize: number
        fontWeight: FontWeight
        color: Colors
      }
      body2: {
        fontSize: number
        fontWeight: FontWeight
        color: Colors
      }
      caption: {
        fontSize: number
        fontWeight: FontWeight
        color: Colors
      }
      overline: {
        fontSize: number
        fontWeight: FontWeight
        color: Colors
      }
    }
  }

  export interface TextProps {
    variants?:
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'subtitle1'
      | 'subtitle2'
      | 'body1'
      | 'body2'
      | 'caption'
      | 'overline'
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
    color?:
      | StringOmit<
          'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
        >
      | undefined
  }

  export interface ComponentTheme {
    Input: Partial<InputProps>
    Button: Partial<ButtonProps>
    DialogButton: Partial<ButtonProps>
  }
}
