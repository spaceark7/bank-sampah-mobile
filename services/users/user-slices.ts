import { apiSlice } from '@/services/base-api/api'

import { UserCreateParam, UserEntity, UserUpdateParam } from './user-entity'
import {
  DataListResponse,
  ErrorResponse,
  FilterParam,
  ResponseEntity,
  queryFilterBuilder,
} from '@/utils/types'

export const UserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetail: builder.query<UserEntity, void>({
      query: () => ({
        url: 'users',
        timeout: 5000,
      }),
      providesTags: ['User'],
      transformResponse: (response: ResponseEntity<UserEntity>) => {
        return response.data
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
    }),
    /**
     * Member Related
     * @spaceark7
     */

    /**
     * Admin User Related
     * @spaceark7
     * @scope administator user
     * */
    getAdminUser: builder.query<
      DataListResponse<UserEntity[]>,
      FilterParam | void
    >({
      query: (filter) => {
        return filter
          ? queryFilterBuilder(filter, 'users-admin')
          : 'users-admin'
      },
      providesTags: (result) => {
        return result?.data.length
          ? [
              ...result.data.map(({ id }) => ({
                type: 'AdminUser' as const,
                id: id,
              })),
              { type: 'AdminUser', id: 'LIST' },
            ]
          : [{ type: 'AdminUser', id: 'LIST' }]
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
    }),
    createAdminUser: builder.mutation<UserEntity, UserCreateParam>({
      query: (params) => ({
        url: `users-admin`,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['AdminUser'],
      transformResponse: (response: ResponseEntity<UserEntity>) => {
        return response.data
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
    }),
    updateAdminUser: builder.mutation<UserEntity, UserUpdateParam>({
      query: (params) => ({
        url: `users-admin/${params.id}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'AdminUser', id: result.id }] : [],
      transformResponse: (response: ResponseEntity<UserEntity>) => {
        return response.data
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
    }),
    deleteAdminUser: builder.mutation<UserEntity, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminUser'],
      transformResponse: (response: ResponseEntity<UserEntity>) => {
        return response.data
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
    }),
  }),
})

export const {
  useGetUserDetailQuery,
  useGetAdminUserQuery,
  useCreateAdminUserMutation,
  useUpdateAdminUserMutation,
  useDeleteAdminUserMutation,
} = UserApiSlice
