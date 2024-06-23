export interface UserEntity {
  id: string
  email: string
  phone_number: string
  role_id: string
  user_detail: UserDetail
}

export interface UserDetail {
  id: string
  first_name: string
  last_name: string
  user_image_url: null
  activated_at: Date
  deleted_at: null
  balance?: Balance
  citizenship?: Citizenship
}

export interface Balance {
  balance_amount: number
}

export interface Citizenship {
  nik_number: string
  family_id_number: string
  address?: Address | null
  birth_place: string
  birth_date: Date
  gender: string
  marital_status: string
  id_card_image_url?: string | null
}

export interface Address {
  address: string
  village: string
  district: string
  city: string
  province: string
  postal_code: string
}

export interface UserCreateParam {
  email: string
  phone_number: string
  password: string
  confirm_password: string
  is_admin: boolean
  user_detail: {
    first_name: string
    last_name?: string
    user_image_url?: string
  }
}

export interface UserAddIdentityParam extends Citizenship {
  id: string
}

export interface UserUpdateParam {
  id: string
  email?: string
  password?: string | null
  confirm_password?: string | null
  phone_number?: string
  user_detail: {
    first_name?: string
    last_name?: string
  }
}
export type MemberUpdateParam = Omit<
  UserUpdateParam,
  'password' | 'confirm_password'
>
