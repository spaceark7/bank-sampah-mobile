import React from 'react'
import { UserEntity } from '@/services/users/user-entity'
import { Redirect } from 'expo-router'
import { Role } from '@/utils/types'

type RouteCheckProps = {
  user: UserEntity
}

const RouteCheck: React.FC<RouteCheckProps> = ({ user }) => {
  console.log('RouteCheck:User', user)
  if (user.role_id === Role.ADMIN) {
    return <Redirect href='/(admin)' />
  } else {
    return <Redirect href='/(user)' />
  }
}

export default RouteCheck
