export interface TransactionEntity {
  id: string
  transaction_status: string
  notes?: string
  transaction_type: string
  created_at: Date
  updated_at: Date
  updated_by: string
  transaction_detail: TransactionDetail[]
  user_detail: UserDetail
}

export interface TransactionDetail {
  id: string
  transaction_amount: number
  transaction_weight: number
  transaction_date: Date
  transaction_unit: string
  transaction_material: string
  transaction_image_url?: string | null
  created_at: Date
  updated_at: Date
  is_deleted: boolean
  transaction_id: string
}

export interface UserDetail {
  id: string
  first_name: string
  last_name: string
  user_email: string
}
