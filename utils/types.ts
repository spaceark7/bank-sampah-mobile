export interface ResponseEntity<T> extends Meta {
  status: string
  message: string
  error?: string
  meta?: Meta | undefined
  data: T
}

export interface ErrorResponse {
  status: string
  message: string
}
export interface QueryParam {
  page?: number
  limit?: number
  search?: string
  sort?: string
  order?: string
}

export interface Meta {
  page: number
  limit: number
  currentPage: number
  totalPages: number | undefined
  totalItems: number | undefined
  hasNextPage: boolean
  hasPreviousPage: boolean
}
export type Filters = {
  title?: string
  type?: 'checkbox' | 'radio' | 'date'
  options?: { label: string; value: string }[]
  value: string | undefined
  condition:
    | 'eq'
    | 'ne'
    | 'gt'
    | 'lt'
    | 'gte'
    | 'lte'
    | 'contains'
    | 'in'
    | 'notIn'
  key: string
}

export interface FilterParam extends Record<string, any> {
  skip?: number
  take?: number
  search?: string
  sort?: string
  order?: string
  limit?: number
  page?: number
  status?: string
  type?: string
  filter?: string
  filters?: Filters[]
  user_id?: string
  is_deleted?: boolean
  is_active?: string | boolean
  date?: {
    arg: 'gte' | 'lte' | 'eq' | 'ne' | 'gt' | 'lt' | undefined
    value: Date | string
  }
}

export enum Role {
  ADMIN = 'Admin',
  USER = 'User',
}

export type CurrencyType =
  | 'IDR'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CNY'
  | 'KRW'
  | 'SGD'
  | 'MYR'
  | 'HKD'
  | 'AUD'
  | 'CAD'
  | 'CHF'
  | 'NZD'
  | 'THB'
  | 'PHP'
  | 'VND'
  | 'DKK'
  | 'SAR'
  | 'AED'
  | 'SEK'
  | 'ZAR'
  | 'INR'
  | 'BND'
  | 'PKR'
  | 'QAR'
  | 'KWD'
  | 'OMR'
  | 'BHD'
  | 'LKR'
  | 'NPR'
  | 'EGP'
  | 'BDT'
  | 'MOP'
  | 'CZK'
  | 'NOK'
  | 'RUB'
  | 'MXN'
  | 'PLN'
  | 'TRY'
  | 'HUF'
  | 'ILS'
  | 'CLP'
  | 'ARS'
  | 'COP'
  | 'TWD'
  | 'COP'
  | 'TWD'
  | 'RON'
  | 'PEN'
  | 'DZD'
  | 'MAD'
  | 'KZT'
  | 'UZS'
  | 'TND'
  | 'BYN'
  | 'GTQ'
  | 'UAH'
  | 'HRK'
  | 'BGN'
  | 'JOD'
  | 'VEF'
  | 'BOB'
  | 'LBP'
  | 'XOF'
  | 'NGN'
  | 'TZS'
  | 'GHS'
  | 'UGX'
  | 'XAF'
  | 'RSD'
  | 'SYP'
  | 'AOA'
  | 'XPF'
  | 'KES'
  | 'MZN'
  | 'CUC'
  | 'BWP'
  | 'LYD'
  | 'GEL'
  | 'XCD'
  | 'ALL'
  | 'HNL'
  | 'NAD'
  | 'MUR'
  | 'AMD'
  | 'NIO'
  | 'JMD'
  | 'MGA'
  | 'BMD'
  | 'KGS'
  | 'AFN'
  | 'HTG'
  | 'PYG'
  | 'SDG'
  | 'ETB'
  | 'NPR'
  | 'YER'
  | 'MVR'
  | 'SCR'
  | 'SLL'
  | 'TOP'

export type DataListResponse<T> = {
  data: T
  meta?: Meta
}

/**
 * @Section Functions
 */

//* Functions
