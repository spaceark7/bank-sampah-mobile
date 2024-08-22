import { CurrencyType, FilterParam, Filters } from '../types'
import queryString from 'query-string'
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

export const queryFilterBuilder = (filter: FilterParam, api: string) => {
  //   const queryParams: string[] = []
  //   const a = queryString.stringify(filter)
  //   console.log('queryFilterBuilder', a)
  //   Object.keys(filter).forEach((key) => {
  //     const value = filter[key]
  //     if (value) {
  //       if (key === 'date') {
  //         if (!value.value) {
  //           return
  //         }
  //         queryParams.push(`${key}=${value.value}&arg_date=${value.arg}`)
  //       } else {
  //         queryParams.push(`${key}=${value}`)
  //       }
  //     }
  //   })

  //   return (query += '?' + queryParams.join('&'))
  return (
    api +
    '?' +
    queryString.stringify({
      ...filter,
    })
  )
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
