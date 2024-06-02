import React, { useEffect } from 'react'
import LoadingScreen from '@/components/ui/loading-screen'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'expo-router'
import { resetInit } from '@/store/slices/auth-slices'

const InitLoad = () => {
  const token = useAppSelector((state) => state.auth.token)
  const dispatch = useAppDispatch()
  const router = useRouter()
  useEffect(() => {
    if (!token) {
      dispatch(resetInit())
      router.replace('/')
    } else {
      router.replace('/user-check')
    }
  }, [])
  return <LoadingScreen message='Initializing' />
}

export default InitLoad
