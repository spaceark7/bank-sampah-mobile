export interface DashboardItemEntity {
  title: string
  value: number
  icon: string
  fill: string
}

export interface DashboardAdminModel {
  widgets: Widget[]
  latestTransaction: LatestTransaction[]
  latestUser: LatestUser[]
}

export interface LatestTransaction {
  id: string
  transaction_status: string
  notes: string
  deleted_at: null
  created_at: Date
  updated_at: Date
  updated_by: string
  user_detail_id: string
  transaction_type: string
  user_detail: DashboardUserDetail
  transaction_detail: TransactionDetail[]
}

export interface TransactionDetail {
  transaction_amount: number
}

export interface LatestUser {
  id: string
  email: string
  phone_number: string
  password: string
  role_id: RoleID
  user_detail: DashboardUserDetail
}

export enum RoleID {
  Admin = 'Admin',
  User = 'User',
}

export interface DashboardUserDetail {
  first_name: string
  last_name: string
  user_image_url: string | null
  activated_at: Date | string
}

export interface Widget {
  title: string
  value: number
  icon: string
  fill: string
}
