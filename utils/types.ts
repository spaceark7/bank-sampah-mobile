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
  type?: 'checkbox' | 'radio'
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

export interface FilterParam {
  [key: string]: any
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

type CurrencyType =
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

export const CurrencyFormatter = (
  value: number | null | undefined,
  currency: CurrencyType = 'IDR',
  locale: string = 'id-ID'
) => {
  if (!value) {
    return ''
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value)
}

export const DateFormatter = (
  date: string | Date,
  locale: string = 'id-ID'
) => {
  if (!date) {
    return '-'
  }
  return new Date(date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getValueFromPath(obj: any, path: string) {
  return path.split('.').reduce((o, k) => (o || {})[k], obj)
}

export const filterStatusParse = ({
  filter,
}: {
  filter: Pick<FilterParam, 'is_active'>
}) => {
  if (typeof filter.is_active === 'string') {
    return ''
  } else {
    return filter.is_active
      ? `&is_active=${filter.is_active}`
      : `&is_active=${filter.is_active}`
  }
}

export const queryFilterBuilder = (filter: FilterParam, query: string) => {
  const queryParams: string[] = []

  Object.keys(filter).forEach((key) => {
    const value = filter[key]
    if (value) {
      if (key === 'date') {
        if (!value.value) {
          return
        }
        queryParams.push(`${key}=${value.value}&arg_date=${value.arg}`)
      } else {
        queryParams.push(`${key}=${value}`)
      }
    }
  })

  return (query += '?' + queryParams.join('&'))
}

export const parseFilter = (filter: Filters[], key: string) => {
  if (!filter) return undefined
  const filterData = filter.find((item) => item.key === key)
  if (filterData) {
    return filterData.value
  } else {
    return undefined
  }
}

export const Accumulator = (data: any[], key: string) => {
  return data.reduce((acc: any, item: any) => {
    if (!acc[item[key]]) {
      acc[item[key]] = []
    }
    acc[item[key]].push(item)
    return acc
  }, {})
}
