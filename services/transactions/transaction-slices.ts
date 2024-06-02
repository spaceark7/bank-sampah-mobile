import {
  DataListResponse,
  FilterParam,
  queryFilterBuilder,
} from '@/utils/types'
import { apiSlice } from '../base-api/api'
import { TransactionEntity } from './transactions-entities'

export const TransactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getTransaction: builder.query<TransactionEntity, string>({
    // query: (id) => `transactions/${id}`,
    // providesTags: ['Transaction'],
    // transformResponse: (response: ResponseEntity<TransactionEntity>) => {
    //     return response.data
    // },
    // }),
    getTransactionsList: builder.query<
      DataListResponse<TransactionEntity[]>,
      FilterParam | void
    >({
      query: (filter) => {
        return filter
          ? queryFilterBuilder(filter, 'transactions')
          : 'transactions'
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCacheData, newData) => {
        newData.data.forEach((item) => {
          const alreadyExist = currentCacheData.data.find(
            (i) => i.id === item.id
          )

          if (alreadyExist) {
            return
          } else {
            currentCacheData.data.push(item)
          }
        })
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: (result) =>
        result?.data.length
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Transaction' as const,
                id: id,
              })),
              { type: 'Transaction', id: 'LIST' },
            ]
          : [{ type: 'Transaction', id: 'LIST' }],
    }),
    // createTransaction: builder.mutation<TransactionEntity, TransactionCreateParam>({
    // query: (params) => ({
    //     url: 'transactions',
    //     method: 'POST',
    //     body: params,
    // }),
    // invalidatesTags: ['Transaction'],
    // transformResponse: (response: ResponseEntity<TransactionEntity>) => {
    //     return response.data
    // },
    // }),
    // updateTransaction: builder.mutation<TransactionEntity, { id: string; data: Partial<TransactionCreateParam> }>({
    // query: ({ id, data }) => ({
    //     url: `transactions/${id}`,
    //     method: 'PUT',
    //     body: data,
    // }),
    // invalidatesTags: ['Transaction'],
    // transformResponse: (response: ResponseEntity<TransactionEntity>) => {
    //     return response.data
    // },
    // }),
    // deleteTransaction: builder.mutation<TransactionEntity, string>({
    // query: (id) => ({
    //     url: `transactions/${id}`,
    //     method: 'DELETE',
    // }),
    // invalidatesTags: ['Transaction'],
    // transformResponse: (response: ResponseEntity<TransactionEntity>) => {
    //     return response.data
    // },
    // }),
  }),
})

export const { useGetTransactionsListQuery } = TransactionApiSlice
