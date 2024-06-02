import React, { useEffect } from 'react'
import LoadingScreen from '@/components/ui/loading-screen'
import { useGetUserDetailQuery } from '@/services/users/user-slices'
import { Redirect } from 'expo-router'
import RouteCheck from '@/layouts/route-check'
import { useAppDispatch } from '@/store/hooks'
import { loginFailed } from '@/store/slices/auth-slices'

const UserCheck = () => {
  const dispatch = useAppDispatch()
  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
  } = useGetUserDetailQuery(undefined, {
    refetchOnFocus: true,
  })

  useEffect(() => {
    if (isError) {
      dispatch(loginFailed('Session Expired'))
    }
  }, [isError])

  return isLoading ? (
    <LoadingScreen message='Memeriksa Sesi Pengguna...' />
  ) : isError ? (
    <Redirect href='/login' />
  ) : isSuccess ? (
    <RouteCheck user={user} />
  ) : null
}

export default UserCheck
