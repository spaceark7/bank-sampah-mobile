export interface MaterialEntity {
  id: string
  name: string
  base_price: number
  unit: string
  created_at: Date
  updated_at: Date
  is_active: boolean
  is_deleted: boolean
  deleted_at: null
}

export interface MaterialCreateParam {
  name: string
  base_price: number
  unit: string
  is_active: boolean
}
