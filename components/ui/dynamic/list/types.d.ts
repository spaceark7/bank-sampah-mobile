import { Filters } from '@/utils/types'
import React from 'react'

export interface IDynamicListProps<T> {
  filters?: Filters[]
  data: T
  states: {
    isLoading: boolean
    isFetching?: boolean
    isSuccess: boolean
    isError: boolean
  }
  renderItem: React.FC<{ item: T }>
  onRefreshCallback: () => void
}
