import { ErrorResponse, ResponseEntity } from '@/utils/types'
import { apiSlice } from '../base-api/api'
import { DashboardAdminModel, DashboardItemEntity } from './dashboard-entities'

export const DashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query<DashboardAdminModel, void>({
      query: () => ({
        url: 'dashboard-admin',
        timeout: 5000,
      }),
      providesTags: ['Dashboard'],
      transformResponse: (response: ResponseEntity<DashboardAdminModel>) => {
        return response.data
      },
      transformErrorResponse: (response: { status: string | number }) => {
        return response as ErrorResponse
      },
    }),
  }),
})

export const { useGetAdminDashboardQuery } = DashboardApiSlice
