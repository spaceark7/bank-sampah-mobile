import { apiSlice } from '@/services/base-api/api'

import { InferType } from 'yup'
import { UserCitizenSchema } from '@/utils/schemas/user-schema'
import {
  MemberUpdateParam,
  UserAddIdentityParam,
  UserCreateParam,
  UserEntity,
} from '../users/user-entity'
import {
  DataListResponse,
  ErrorResponse,
  FilterParam,
  ResponseEntity,
} from '@/utils/types'
import { queryFilterBuilder } from '@/utils/helpers/Functions'

export const MemberApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Member Related
     * @spaceark7
     */
    createMember: builder.mutation<ResponseEntity<UserEntity>, UserCreateParam>(
      {
        query: (params) => ({
          url: `register`,
          method: 'POST',
          body: params,
        }),
        invalidatesTags: ['Member'],
        transformResponse: (response: ResponseEntity<UserEntity>) => {
          return response
        },
        transformErrorResponse: (response: { status: string | number }) => {
          console.log('transformErrorResponse', response)
          return response as ErrorResponse
        },
      }
    ),
    getMemberById: builder.query<ResponseEntity<UserEntity>, string>({
      query: (id) => `members/${id}`,
      providesTags: (result, error, id) => [{ type: 'Member', id }],
      transformResponse: (response: ResponseEntity<UserEntity>) => {
        return response
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
    }),
    getAllMember: builder.query<
      DataListResponse<UserEntity[]>,
      FilterParam | void
    >({
      query: (filter) => {
        return filter ? queryFilterBuilder(filter, 'users/all') : 'users/all'
      },
      keepUnusedDataFor: 0,
      serializeQueryArgs: ({ endpointName }) => {
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
        console.log('forceRefetch', currentArg, previousArg)
        return currentArg?.page !== previousArg?.page
      },
      // providesTags: ['Member'],
      providesTags: (result) => {
        return result?.data
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Member' as const,
                id: id,
              })),
              { type: 'Member', id: 'LIST' },
            ]
          : [{ type: 'Member', id: 'LIST' }]
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
    }),
    updateMember: builder.mutation<
      ResponseEntity<UserEntity>,
      MemberUpdateParam
    >({
      query: (params) => ({
        url: `members/${params.id}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: (result) => ['Member'],
      transformResponse: (response: ResponseEntity<UserEntity>) => {
        return response
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
    }),
    addMemberIdentity: builder.mutation<
      ResponseEntity<UserEntity>,
      {
        id: string
        data: InferType<typeof UserCitizenSchema>
      }
    >({
      query: (params) => ({
        url: `members/citizenship/${params.id}`,
        method: 'POST',
        body: params.data,
      }),
      invalidatesTags: ['Member'],
      transformResponse: (response: ResponseEntity<UserEntity>) => {
        return response
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
    }),
    updateMemberIdentity: builder.mutation<
      ResponseEntity<UserEntity>,
      UserAddIdentityParam
    >({
      query: (params) => ({
        url: `members/citizenship/${params.id}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['Member'],
      transformResponse: (response: ResponseEntity<UserEntity>) => {
        return response
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
    }),
    deactivateMember: builder.mutation<ResponseEntity<UserEntity>, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Member'],
      transformResponse: (response: ResponseEntity<UserEntity>) => {
        return response
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
    }),
  }),
})

export const {
  useCreateMemberMutation,
  useGetMemberByIdQuery,
  useUpdateMemberMutation,
  useAddMemberIdentityMutation,
  useUpdateMemberIdentityMutation,
  useDeactivateMemberMutation,
  useGetAllMemberQuery,
} = MemberApiSlice
