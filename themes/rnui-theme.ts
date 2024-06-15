import { StringOmit } from '@rneui/base'
import { Colors, createTheme } from '@rneui/themed'

const base_colors = {
  light: {
    blue: '#106ebe',
    green: '#56a641',
    yellow: '#f6bd30',
    cyan: '#2cacd5',
    pink: '#d8297d',
    indigo: '#2c47d5',
    teal: '#41a694',
    orange: '#f68f30',
    bluegray: '#657c8a',
    purple: '#8378de',
    red: '#d82a13',
    primary: '#10b981',
    primaryLight: '#a7f3d0',
    primaryTextColor: '#ffffff',
    successTextColor: '#1ea97c',
    secondaryTextColor: '#9ca3af',
    dangerTextColor: '#ff5757',
    warningTextColor: '#cc8925',
    infoTextColor: '#3b82f6',
    infoMessageBg: 'rgba(219, 234, 254, 0.7)',
    successMessageBg: 'rgba(228, 248, 240, 0.7)',
    dangerMessageBg: 'rgba(255, 231, 230, 0.7)',
    warningMessageBg: 'rgba(255, 242, 226, 0.7)',
    textSecondaryColor: '#6b7280',
    divider: '#e5e7eb',
    maskBg: 'rgba(0, 0, 0, 0.4)',
    errorColor: '#e24c4c',
  },
  dark: {
    blue: '#106ebe',
    green: '#56a641',
    yellow: '#f6bd30',
    cyan: '#2cacd5',
    pink: '#d8297d',
    indigo: '#2c47d5',
    teal: '#41a694',
    orange: '#f68f30',
    bluegray: '#657c8a',
    purple: '#8378de',
    red: '#d82a13',
    primary: '#10b981',
    primaryLight: '#a7f3d0',
    primaryTextColor: '#030712',
    successTextColor: '#6ee7b7',
    secondaryTextColor: '#9ca3af',
    dangerTextColor: '#fca5a5',
    warningTextColor: '#fde047',
    infoTextColor: '#93c5fd',
    infoMessageBg: 'rgba(59, 130, 246, 0.2)',
    successMessageBg: 'rgba(16, 185, 129, 0.2)',
    dangerMessageBg: 'rgba(239, 68, 68, 0.2)',
    warningMessageBg: 'rgba(234, 179, 8, 0.2)',
    textSecondaryColor: 'rgba(255, 255, 255, 0.6)',
    divider: '#424b57',
    maskBg: 'rgba(0, 0, 0, 0.4)',
    errorColor: '#fca5a5',
  },
}

const shades_colors = {
  light: {
    shade000: '#ffffff', //surface
    shade100: '#f9fafb', //header background
    shade200: '#f3f4f6', //hover background
    shade300: '#e5e7eb', //border, divider
    shade400: '#d1d5db', //input border
    shade500: '#9ca3af', //input icon
    shade600: '#6b7280', //text secondary color
    shade700: '#4b5563', //text color
    shade800: '#374151', //unused
    shade900: '#1f2937', //unused
  },
  dark: {
    shade000: ' rgba(255, 255, 255, 0.87)', //surface
    shade100: 'rgba(255, 255, 255, 0.6)', //header background
    shade200: '#f3f4f6', //hover background
    shade300: '#e5e7eb', //border, divider
    shade400: '#d1d5db', //input border
    shade500: '#6b7280', //input icon
    shade600: '#424b57', //text secondary color
    shade700: '#374151', //text color
    shade800: '#1f2937', //unused
    shade900: '#111827', //unused
  },
}

type ButtonColorProps = {
  color:
    | StringOmit<'primary' | 'secondary' | 'success' | 'warning' | 'error'>
    | undefined
  theme: Colors
}

const generateColor = ({ color, theme }: ButtonColorProps) => {
  switch (color) {
    case 'primary':
      return theme.primary

    case 'secondary':
      return theme.bluegray

    case 'success':
      return theme.green
    case 'error':
      return theme.red

    case 'warning':
      return theme.yellow
    case 'info':
      return theme.blue
    default:
      return theme.primary
  }
}

export const rnuiTheme = createTheme({
  lightColors: {
    ...base_colors.light,
    ...shades_colors.light,
    primary: '#10b981',
    primaryLight: '#a7f3d0',
    textColor: shades_colors.light.shade700,
    background: '#f9fafb',
  },
  darkColors: {
    ...base_colors.dark,
    ...shades_colors.dark,
    primary: '#34d399',
    primaryLight: '#6ee7b7',
    primaryTextColor: '#030712',
    textColor: shades_colors.light.shade000,

    background: '#111827',
  },
  global: {
    borderRadius: 6,
    containerPadding: 16,
  },
  components: {
    Input: (props, theme) => {
      return {
        containerStyle: {
          paddingHorizontal: 0,
        },
        inputContainerStyle: {
          borderBottomWidth: props.variant === 'outlined' ? 1 : 0,
          borderWidth: props.variant === 'outlined' ? 1 : 0,
          borderRadius: 6,
          borderColor: props.invalid
            ? theme.colors.error
            : theme.mode === 'dark'
            ? theme.colors.shade600
            : theme.colors.shade400,
          backgroundColor: props.invalid
            ? theme.colors.dangerMessageBg
            : props.variant === 'filled' || !props.variant
            ? theme.mode === 'dark'
              ? theme.colors.shade800
              : theme.colors.shade000
            : 'rgba(0,0,0,0)',
        },
        rightIcon: {
          color:
            theme.mode === 'dark'
              ? theme.colors.shade100
              : theme.colors.shade700,
        },
        rightIconContainerStyle: {
          marginEnd: 6,
        },
        leftIconContainerStyle: {
          marginStart: 6,
        },
        labelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 4,
        },
        style: {
          borderRadius: 6,
          padding: 10,
          backgroundColor:
            props.variant === 'filled'
              ? theme.mode === 'dark'
                ? theme.colors.shade800
                : theme.colors.shade000
              : 'rgba(0,0,0,0)',

          color:
            theme.mode === 'dark'
              ? theme.colors.shade100
              : theme.colors.shade700,
          fontSize: 16,
          lineHeight: 24,
          fontFamily: 'Inter-Regular',
          placeholderTextColor:
            theme.mode === 'dark'
              ? theme.colors.shade100
              : theme.colors.shade600,
        },
      }
    },

    Button: (props, theme) => {
      let styleColor = generateColor({
        color: props.color,
        theme: theme.colors,
      })

      return {
        type: props.outlined ? 'outline' : props.text ? 'clear' : 'solid',
        titleStyle: {
          color:
            props.outlined || props.text
              ? styleColor
              : theme.colors.primaryTextColor,
          fontFamily: 'Inter-Medium',
          fontSize: props.size === 'sm' ? 12 : props.size === 'lg' ? 20 : 16,
          fontWeight: '600',
        },
        style: {
          paddingVertical: 12,
          paddingHorizontal: 16,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: props.rounded ? 30 : 6,
        },
        icon: {
          color:
            props.outlined || props.text
              ? theme.colors.primary
              : theme.colors.primaryTextColor,
        },
        containerStyle: {
          padding: 10,
          borderRadius: props.rounded ? 30 : 6,
        },
        buttonStyle: {
          borderRadius: props.rounded ? 30 : 6,
          backgroundColor:
            props.outlined || props.text ? 'rgba(0,0,0,0)' : styleColor,
          borderColor: props.outlined ? styleColor : 'rgba(0,0,0,0)',
        },
      }
    },
    Dialog: (props, theme) => {
      return {
        overlayStyle: {
          backgroundColor: theme.colors.background,
          borderRadius: 6,
        },
      }
    },
    DialogTitle: (props, theme) => {
      return {
        titleStyle: {
          color: theme.colors.textColor,
        },
      }
    },
    DialogButton: (props, theme) => {
      let styleColor = generateColor({
        color: props.color,
        theme: theme.colors,
      })

      return {
        type: props.outlined ? 'outline' : props.text ? 'clear' : 'solid',
        titleStyle: {
          color:
            props.outlined || props.text
              ? styleColor
              : theme.colors.primaryTextColor,
          fontFamily: 'Inter-Medium',
          fontSize: props.size === 'sm' ? 12 : props.size === 'lg' ? 20 : 16,
          fontWeight: '600',
        },
        style: {
          paddingVertical: 12,
          paddingHorizontal: 16,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: props.rounded ? 30 : 6,
        },
        icon: {
          color:
            props.outlined || props.text
              ? theme.colors.primary
              : theme.colors.primaryTextColor,
        },
        containerStyle: {
          padding: 10,
          borderRadius: props.rounded ? 30 : 6,
        },
        buttonStyle: {
          borderRadius: props.rounded ? 30 : 6,
          backgroundColor:
            props.outlined || props.text ? 'rgba(0,0,0,0)' : styleColor,
          borderColor: props.outlined ? styleColor : 'rgba(0,0,0,0)',
        },
      }
    },
    Divider: (props, theme) => {
      return {
        color:
          theme.mode === 'dark' ? theme.colors.shade600 : theme.colors.shade300,
      }
    },
    Icon: (props, theme) => {
      return {
        pressableProps: {
          android_ripple: {
            color:
              theme.mode === 'dark'
                ? theme.colors.shade600
                : theme.colors.shade400,
          },
        },
      }
    },
    //* List Item Components
    ListItem: (props, theme) => {
      return {
        containerStyle: {
          padding: 10,
          backgroundColor:
            theme.mode === 'dark'
              ? theme.colors.shade800
              : theme.colors.shade100,
          borderWidth: 1,
          borderRadius: theme.global.borderRadius,
        },
      }
    },
    ListItemTitle: (props, theme) => {
      return {
        style: {
          fontWeight: 'semibold',
        },
      }
    },
    ListItemSubtitle: (props, theme) => {
      return {
        style: {
          color:
            theme.mode === 'dark'
              ? theme.colors.shade400
              : theme.colors.shade600,
        },
      }
    },
    Skeleton: (props, theme) => {
      return {
        skeletonStyle: {
          borderRadius: theme.global.borderRadius,
        },
      }
    },
    // Text: (props, theme) => {
    //   switch (props.variants) {
    //     case 'h1':
    //       return {
    //         style: {
    //           fontSize: 32,
    //           lineHeight: 40,
    //           color: theme.colors.shade700,
    //           fontFamily: 'Inter-Bold'
    //         }
    //       }
    //     case 'h2':
    //       return {
    //         style: {
    //           fontSize: 24,
    //           lineHeight: 32,
    //           color: theme.colors.shade700,
    //           fontFamily: 'Inter-Bold'
    //         }
    //       }
    //     case 'h3':
    //       return {
    //         style: {
    //           fontSize: 20,
    //           lineHeight: 28,
    //           color: theme.colors.shade700,
    //           fontFamily: 'Inter-Bold'
    //         }
    //       }
    //     case 'h4':
    //       return {
    //         style: {
    //           fontSize: 18,
    //           lineHeight: 26,
    //           color: theme.colors.shade700,
    //           fontFamily: 'Inter-Bold'
    //         }
    //       }
    //     case 'h5':
    //       return {
    //         style: {
    //           fontSize: 16,
    //           lineHeight: 24,
    //           color: theme.colors.shade700,
    //           fontFamily: 'Inter-Bold'
    //         }
    //       }
    //     case 'h6':
    //       return {
    //         style: {
    //           fontSize: 14,
    //           lineHeight: 22,
    //           color: theme.colors.shade700,
    //           fontFamily: 'Inter-Bold'
    //         }
    //       }
    //     case 'subtitle1':
    //       return {
    //         style: {
    //           fontSize: 16,
    //           lineHeight: 24,
    //           color: theme.colors.shade700,
    //           fontFamily: 'Inter-Medium'
    //         }
    //       }
    //     case 'subtitle2':
    //       return {
    //         style: {
    //           fontSize: 14,
    //           lineHeight: 22,
    //           color: theme.colors.shade700,
    //           fontFamily: 'Inter-Medium'
    //         }
    //       }
    //     case 'body1':
    //       return {
    //         style: {
    //           fontSize: 16,
    //           lineHeight: 24,
    //           color: theme.colors.shade700,
    //           fontFamily: 'Inter-Regular'
    //         }
    //       }
    //     case 'body2':
    //       return {
    //         style: {
    //           fontSize: 14,
    //           lineHeight: 22,
    //           color: theme.colors.shade700,
    //           fontFamily: 'Inter-Regular'
    //         }
    //       }
    //     case 'caption':
    //       return {
    //         style: {
    //           fontSize: 12,
    //           lineHeight: 20,
    //           color: theme.colors.shade600,
    //           fontFamily: 'Inter-Regular'
    //         }
    //       }
    //     case 'overline':
    //       return {
    //         style: {
    //           fontSize: 10,
    //           lineHeight: 18,
    //           color: theme.colors.shade600,
    //           fontFamily: 'Inter-Regular'
    //         }
    //       }

    //     default:
    //       return {
    //         style: {
    //           fontSize: 16,
    //           lineHeight: 24,
    //           color: theme.colors.shade700,
    //           fontFamily: 'Inter-Regular'
    //         }
    //       }
    //   }
    // }
  },
  mode: 'light',
})
