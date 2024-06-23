import { apiSlice } from '@/services/base-api/api'
import { FilterParam, ResponseEntity, filterStatusParse } from '@/utils/types'
import { MaterialCreateParam, MaterialEntity } from './material-entity'

export const MaterialApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMaterialList: builder.query<
      ResponseEntity<MaterialEntity[]>,
      FilterParam | void
    >({
      query: (filter) => {
        let query = `materials`
        if (filter) {
          query += `?${filter.limit ? `limit=${filter.limit}` : ''}${
            filter.page ? `&page=${filter.page}` : ''
          }${
            filter.user_id ? `&user_id=${filter.user_id}` : ''
          }${filterStatusParse({
            filter: {
              is_active: filter.is_active,
            },
          })}${filter.type ? `&type=${filter.type}` : ''}${
            filter.search ? `&search=${filter.search}` : ''
          }${
            filter.date?.value
              ? `&date=${new Date(
                  filter.date.value
                ).toLocaleDateString()}&arg_date=${filter.date.arg}`
              : ''
          }
          `
        }
        return query
      },
      providesTags: (result) => {
        return result?.data.length
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Material' as const,
                id: id,
              })),
              { type: 'Material', id: 'LIST' },
            ]
          : [{ type: 'Material', id: 'LIST' }]
      },
    }),
    getMaterialDetail: builder.query<ResponseEntity<MaterialEntity>, string>({
      query: (id) => `materials/${id}`,
      providesTags: (result) =>
        result ? [{ type: 'Material', id: result.data.id }] : [],
    }),
    createMaterial: builder.mutation<
      ResponseEntity<MaterialEntity>,
      MaterialCreateParam
    >({
      query: (params) => ({
        url: `materials`,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: [{ type: 'Material', id: 'LIST' }],
    }),
    updateMaterial: builder.mutation<
      ResponseEntity<MaterialEntity>,
      Partial<MaterialEntity>
    >({
      query: (params) => ({
        url: `materials/${params.id}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: (result) =>
        result?.data
          ? [{ type: 'Material', id: result.data.id }]
          : ['Material'],
    }),
    deleteMaterial: builder.mutation<ResponseEntity<MaterialEntity>, string>({
      query: (id) => ({
        url: `materials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) =>
        result?.data
          ? [{ type: 'Material', id: result.data.id }]
          : ['Material'],
    }),
  }),
})

export const {
  useGetMaterialListQuery,
  useGetMaterialDetailQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = MaterialApiSlice
