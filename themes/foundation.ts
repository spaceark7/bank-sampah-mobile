import { Theme } from '@react-navigation/native'
import { colorsPalette } from './design-token'
import { rnuiTheme } from './rnui-theme'

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: colorsPalette.primary1,
    background: rnuiTheme.darkColors?.background || colorsPalette.dark,
    card: colorsPalette.grey40,
    text: colorsPalette.grey80,
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
}

const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: colorsPalette.primary1,
    background: colorsPalette.white,
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
}

export { DarkTheme, DefaultTheme }
