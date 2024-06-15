import { useState } from 'react'
import { Pressable, TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useGetUserDetailQuery } from '@/services/users/user-slices'
import GlobalModalService from '../modal/global-modal'
import { useAppDispatch } from '@/store/hooks'
import { UserLogout, logout } from '@/store/slices/auth-slices'
import { useRouter } from 'expo-router'
import useSecureStore from '@/hooks/secure-store'
import { apiSlice } from '@/services/base-api/api'
import { Avatar, Overlay, Skeleton, useTheme } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, View } from '@/components/Themed'
import ContentLoader from '../content-loader/ContentLoader'

const ProfileHeader = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const { data: user, isSuccess, isLoading, isError } = useGetUserDetailQuery()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { removeStore } = useSecureStore()

  const onShowModal = () => {
    setModal(true)
    setVisible(false)
  }

  const toggleOverlay = () => {
    setVisible((prev) => !prev)
  }

  const onLogout = async () => {
    dispatch(logout('Logout'))
    await dispatch(UserLogout())
    await removeStore('token')
    dispatch(apiSlice.util.resetApiState())
    router.replace('/')
  }

  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0)',
      }}
    >
      {/* <OverflowMenu
        visible={visible}
        anchor={ProfileButton}
        onBackdropPress={() => setVisible(false)}
        placement={PopoverPlacements.BOTTOM_END}
      >
        <MenuItem title='Keluar' onPress={onShowModal} />
      </OverflowMenu> */}
      <ProfileButton
        action={toggleOverlay}
        isLoading={isLoading}
        name={user?.user_detail.first_name}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          position: 'absolute',
          top: 50,
          left: 12,
          width: 200,
        }}
      >
        <Pressable onPress={onShowModal}>
          <Text>Keluar</Text>
        </Pressable>
      </Overlay>

      <GlobalModalService
        visible={modal}
        onBackdropPress={() => setModal(false)}
        buttonTitle='Keluar'
        action={onLogout}
        title='Yakin untuk keluar?'
      ></GlobalModalService>
    </View>
  )
}

const ProfileButton = ({
  action,
  isLoading = false,
  name,
}: {
  action: () => void
  isLoading: boolean
  name?: string
}) => {
  const { theme } = useTheme()

  return (
    <Pressable onPress={() => action()}>
      <ContentLoader isLoading={isLoading} type='circle'>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            backgroundColor: 'rgba(0,0,0,0)',
            marginLeft: 12,
            width: 100,
          }}
        >
          <Avatar
            size={30}
            rounded
            title='A'
            containerStyle={{
              backgroundColor: theme.colors.primary,
            }}
          />
          <Text>{name}</Text>
        </View>
      </ContentLoader>
      {/* {isLoading ? (
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation='wave'
              width={80}
              height={40}
            />
          ) : (
            <>
              <Avatar
                size='small'
                source={{
                  uri: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
                }}
              />
              <Text>{user?.user_detail.first_name}</Text>
              <MaterialIcons name='arrow-drop-down' size={24} color='black' />
            </>
          )} */}
    </Pressable>
  )
}

export default ProfileHeader
