
import { useState } from 'react'
import LayoutContainer from '../layout- container'
import { Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useGetUserDetailQuery } from '@/services/users/user-slices'
import GlobalModalService from '../modal/global-modal'
import { useAppDispatch } from '@/store/hooks'
import { UserLogout, logout } from '@/store/slices/auth-slices'
import { useRouter } from 'expo-router'
import useSecureStore from '@/hooks/secure-store'
import { apiSlice } from '@/services/base-api/api'
import { Avatar, Skeleton, useTheme } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'

const ProfileHeader = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const { data: user, isSuccess, isLoading, isError } = useGetUserDetailQuery()
  const {theme} = useTheme()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { removeStore } = useSecureStore()

  const onShowModal = () => {
    setModal(true)
    setVisible(false)
  }

  const onLogout = async () => {
    dispatch(logout('Logout'))
    await dispatch(UserLogout())
    await removeStore('token')
    dispatch(apiSlice.util.resetApiState())
    router.replace('/')
  }

  const ProfileButton = () => {
    return (
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            backgroundColor: theme.colors.shade300,
          }}
        >
          {isLoading ? (
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
          )}
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <LayoutContainer level='2'>
      {/* <OverflowMenu
        visible={visible}
        anchor={ProfileButton}
        onBackdropPress={() => setVisible(false)}
        placement={PopoverPlacements.BOTTOM_END}
      >
        <MenuItem title='Keluar' onPress={onShowModal} />
      </OverflowMenu> */}

      <GlobalModalService
        visible={modal}
        onBackdropPress={() => setModal(false)}
        buttonTitle='Keluar'
        action={onLogout}
      >
        <View>
          <Text>Yakin untuk keluar?</Text>
        </View>
      </GlobalModalService>
    </LayoutContainer>
  )
}

export default ProfileHeader
