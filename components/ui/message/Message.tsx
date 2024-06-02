import { StyleSheet } from 'react-native'

interface MessageProps {
  message: string
  variant: 'success' | 'error' | 'info' | 'warning' | 'basic'
  style?: object
  onHide?: () => void
}

import React, { useCallback } from 'react'
import { Text, View } from '@/components/Themed'
import { Button, Icon, useTheme } from '@rneui/themed'

const Message = (props: MessageProps) => {
  const { theme } = useTheme()
  const [visible, setVisible] = React.useState(props.message !== '')

  const onHide = useCallback(() => {
    setVisible(false)
    if (props.onHide) {
      props.onHide()
    }
  }, [])

  switch (props.variant) {
    case 'success':
      return (
        <View
          style={{
            ...styles.container,
            ...props.style,
            backgroundColor: theme.colors.successMessageBg,
            display: visible ? 'flex' : 'none',
          }}
        >
          <View
            style={{
              ...styles.text_wrapper,
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            <Text
              style={{
                color: theme.colors.successTextColor,
              }}
            >
              {props.message}
            </Text>
          </View>
          <View
            style={{
              ...styles.button_wrapper,
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            <Button onPress={onHide} text color={'error'} size='sm'>
              <Icon type='ionicon' name='close' size={20} />
            </Button>
          </View>
        </View>
      )
    case 'error':
      return (
        <View
          style={{
            ...styles.container,
            ...props.style,
            backgroundColor: theme.colors.dangerMessageBg,
            display: visible ? 'flex' : 'none',
          }}
        >
          <View
            style={{
              ...styles.text_wrapper,
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            <Text
              style={{
                color: theme.colors.dangerTextColor,
              }}
            >
              {props.message}
            </Text>
          </View>
          <View
            style={{
              ...styles.button_wrapper,
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            <Button onPress={onHide} text color={'error'} size='sm'>
              <Icon type='ionicon' name='close' size={20} />
            </Button>
          </View>
        </View>
      )
    case 'info':
      return (
        <View
          style={{
            ...styles.container,
            ...props.style,
            backgroundColor: theme.colors.infoMessageBg,
            display: visible ? 'flex' : 'none',
          }}
        >
          <View
            style={{
              ...styles.text_wrapper,
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            <Text
              style={{
                color: theme.colors.infoTextColor,
              }}
            >
              {props.message}
            </Text>
          </View>
          <View
            style={{
              ...styles.button_wrapper,
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            <Button onPress={onHide} text color={'error'} size='sm'>
              <Icon type='ionicon' name='close' size={20} />
            </Button>
          </View>
        </View>
      )
    case 'warning':
      return (
        <View
          style={{
            ...styles.container,
            ...props.style,
            backgroundColor: theme.colors.warningMessageBg,
            display: visible ? 'flex' : 'none',
          }}
        >
          <View
            style={{
              ...styles.text_wrapper,
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            <Text
              style={{
                color: theme.colors.warningTextColor,
              }}
            >
              {props.message}
            </Text>
          </View>
          <View
            style={{
              ...styles.button_wrapper,
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            <Button onPress={onHide} text color={'error'} size='sm'>
              <Icon type='ionicon' name='close' size={20} />
            </Button>
          </View>
        </View>
      )
    case 'basic':
      return (
        <View
          style={{
            ...styles.container,
            ...props.style,
            backgroundColor: theme.colors.shade300,
            display: visible ? 'flex' : 'none',
          }}
        >
          <View
            style={{
              ...styles.text_wrapper,
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            <Text
              style={{
                color: theme.colors.shade600,
              }}
            >
              {props.message}
            </Text>
          </View>
          <View
            style={{
              ...styles.button_wrapper,
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            <Button onPress={onHide} text color={'error'} size='sm'>
              <Icon type='ionicon' name='close' size={20} />
            </Button>
          </View>
        </View>
      )
    default:
      return (
        <View
          style={{
            ...styles.container,
            ...props.style,
            backgroundColor: theme.colors.secondary,
            display: visible ? 'flex' : 'none',
          }}
        >
          <View style={styles.text_wrapper}>
            <Text
              style={{
                color: theme.colors.secondaryTextColor,
              }}
            >
              {props.message}
            </Text>
          </View>
          <View style={styles.button_wrapper}>
            <Button
              onPress={onHide}
              text
              color={theme.colors.secondary}
              size='sm'
            >
              <Icon type='ionicon' name='close' size={20} />
            </Button>
          </View>
        </View>
      )
  }
}

export default Message

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_wrapper: {
    flex: 1,
  },
  button_wrapper: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
  },
})

const MessageList = ({
  messages,
  theme,
}: {
  messages: string[]
  theme: string
}) => {
  return (
    <View>
      {messages.map((message, index) => {
        return <MessageItem key={index} message={message} theme={theme} />
      })}
    </View>
  )
}

const MessageItem = ({
  message,
  theme,
}: {
  message: string
  theme: string
}) => {
  return (
    <View style={styles.text_wrapper}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Icon type='Ionicons' name='warning-outline' />
        <Text
          style={{
            color: theme,
            marginLeft: 10,
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  )
}
