import {
  DataListResponse,
  ErrorResponse,
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

    getTransactionListByMemberId: builder.query<
      DataListResponse<TransactionEntity[]>,
      FilterParam
    >({
      query: (filter) => {
        return filter
          ? queryFilterBuilder(filter, 'transactions')
          : 'transactions'
      },
      providesTags: (result, error, id) => {
        return result?.data
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Transaction' as const,
                id: id,
              })),
              { type: 'Transaction', id: 'LIST' },
            ]
          : [{ type: 'Transaction', id: 'LIST' }]
      },
      keepUnusedDataFor: 0,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg }) => {
        // const existingIds = new Set(currentCache.data.map((i) => i.id))

        // newItems.data.forEach((item) => {
        //   if (!existingIds.has(item.id)) {
        //     currentCache.data.push(item)
        //     existingIds.add(item.id)
        //   }
        // })

        // currentCache.data.push(...newItems.data)
        currentCache.data = newItems.data
        currentCache.meta = newItems.meta
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.limit !== previousArg?.limit ||
          currentArg?.user_id !== previousArg?.user_id
        )
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
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

export const {
  useGetTransactionsListQuery,
  useGetTransactionListByMemberIdQuery,
} = TransactionApiSlice
