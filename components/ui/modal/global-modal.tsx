import { View } from '@/components/Themed'
import { DialogActions } from '@rneui/base/dist/Dialog/Dialog.Actions'
import { Button, Dialog, useTheme } from '@rneui/themed'
import React from 'react'

type GlobalModalProps = {
  children?: React.ReactNode
  visible: boolean
  onBackdropPress: () => void
  action?: () => void
  buttonTitle?: string
  title?: string
}
const GlobalModalService: React.FC<GlobalModalProps> = ({
  children,
  visible,
  onBackdropPress,
  action,
  buttonTitle,
  title = 'Konfirmasi Logout',
}) => {
  const { theme } = useTheme()
  return (
    <Dialog
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      style={{
        width: '80%',
        alignSelf: 'center',
      }}
    >
      <Dialog.Title title={title} />
      <View>{children}</View>
      <DialogActions>
        <Button text title={buttonTitle ?? 'Logout'} onPress={action} />
        <Button
          color={'secondary'}
          text
          title='Kembali'
          onPress={onBackdropPress}
        />
      </DialogActions>
      {/* <Card
        header={(props) => <HeaderModal {...props} title={title} />}
        footer={(props) => (
          <FooterModal
            {...props}
            action={() => {
              action && action()
            }}
            onClose={onBackdropPress}
            title={buttonTitle ?? 'Logout'}
          />
        )}
        style={{
          backgroundColor: theme['background-basic-color-1'],
          borderRadius: 10,
        }}
      >
        {children}
      </Card> */}
    </Dialog>
  )
}

// interface HeaderModalProps extends ViewProps {
//   title: string
// }

// const HeaderModal = (props: HeaderModalProps) => {
//   return (
//     <View {...props}>
//       <Text>{props.title}</Text>
//     </View>
//   )
// }

// interface FooterModalProps extends ViewProps {
//   action: () => void
//   onClose: () => void
//   title: string
// }
// const FooterModal = (props: FooterModalProps) => {
//   return (
//     <View
//       {...props}
//       style={{
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         marginTop: 10,
//         padding: 16,
//         gap: 10,
//       }}
//     >
//       <Button appearance='ghost' onPress={props.onClose}>
//         Tutup
//       </Button>
//       <Button onPress={props.action}>{props.title ?? 'Simpan'}</Button>
//     </View>
//   )
// }

export default GlobalModalService
