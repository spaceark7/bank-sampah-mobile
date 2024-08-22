/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native'

import Colors from '@/constants/Colors'
import { useColorScheme } from './useColorScheme'
import { useTheme } from '@rneui/themed'

type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

type TextVariant =
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

export type TextProps = ThemeProps &
  DefaultText['props'] & { variants?: TextVariant }
export type ViewProps = ThemeProps & DefaultView['props']

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light'
  const colorFromProps = props[theme]
  console.log('colorFromProps', colorFromProps)
  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

function generateTextColor(variant: string) {
  const { theme } = useTheme()
  switch (variant) {
    case 'h1':
      return theme.mode === 'dark'
        ? theme.colors.textColor
        : theme.colors.textColor
    case 'h2':
      return theme.mode === 'dark'
        ? theme.colors.textColor
        : theme.colors.textColor
    case 'h3':
      return theme.mode === 'dark'
        ? theme.colors.textColor
        : theme.colors.textColor
    case 'h4':
      return theme.mode === 'dark'
        ? theme.colors.textColor
        : theme.colors.textColor
    case 'h5':
      return theme.mode === 'dark'
        ? theme.colors.textColor
        : theme.colors.textColor
    case 'h6':
      return theme.mode === 'dark'
        ? theme.colors.textColor
        : theme.colors.textColor
    case 'subtitle1':
      return theme.mode === 'dark'
        ? theme.colors.textColor
        : theme.colors.textColor
    case 'subtitle2':
      return theme.mode === 'dark'
        ? theme.colors.textColor
        : theme.colors.textColor
    case 'body1':
      return theme.mode === 'dark'
        ? theme.colors.textColor
        : theme.colors.textColor
    case 'body2':
      return theme.mode === 'dark'
        ? theme.colors.textColor
        : theme.colors.textColor
    case 'caption':
      return theme.mode === 'dark'
        ? theme.colors.shade400
        : theme.colors.shade500
    case 'overline':
      return theme.mode === 'dark'
        ? theme.colors.shade400
        : theme.colors.shade600
    default:
      return theme.mode === 'dark'
        ? theme.colors.shade400
        : theme.colors.shade600
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const { theme } = useTheme()

  return (
    <DefaultText
      style={[
        {
          color: generateTextColor(props.variants || 'body1'),
          fontSize: theme.typography[props.variants || 'body1'].fontSize,
          fontWeight: theme.typography[props.variants || 'body1'].fontWeight,
          backgroundColor: 'rgba(0,0,0,0)',
        },
        style,
      ]}
      {...otherProps}
    />
  )
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const { theme } = useTheme()

  // const backgroundColor = useThemeColor(
  //   { light: lightColor, dark: darkColor },
  //   'background'
  // )

  return (
    <DefaultView
      style={[{ backgroundColor: theme.colors.background }, style]}
      {...otherProps}
    />
  )
}
