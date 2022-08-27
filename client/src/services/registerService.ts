import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { IQueryParams, IRegister } from '../models'
import { IAxiosBaseQueryFn, axiosBaseQuery } from './AxiosBaseQuery'

const REGISTER_REDUCER_PATH = 'registerApi'
const REGISTER_TAG_TYPE = 'registerTag' as const

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof REGISTER_TAG_TYPE, typeof REGISTER_REDUCER_PATH>

const createRegister = (builder: IBuilder) => {
  return builder.mutation<IRegister, Omit<IRegister, '_id'>>({
    query(registerCreateDto) {
      return {
        url: '/register',
        method: 'POST',
        data: registerCreateDto
      }
    },
    invalidatesTags() {
      return [{ type: REGISTER_TAG_TYPE, id: 'LIST' }]
    }
  })
}

const getRegisters = (builder: IBuilder) => {
  return builder.query<IRegister[], IQueryParams>({
    query({ search = '', size, status = 1 }) {
      return {
        url: `/register?search=${search !== undefined ? search : ''}&status=${
          status !== undefined ? status : ''
        }&size=${size !== undefined ? size : ''}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      if (!result) return [{ type: REGISTER_TAG_TYPE, id: 'LIST' }]
      return [
        ...result.map(register => ({ type: REGISTER_TAG_TYPE, id: register._id })),
        { type: REGISTER_TAG_TYPE, id: 'LIST' }
      ]
    }
  })
}

const registerApi = createApi({
  reducerPath: REGISTER_REDUCER_PATH,
  tagTypes: [REGISTER_TAG_TYPE],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createRegister: createRegister(builder),
    getRegisters: getRegisters(builder)
  })
})

const { useCreateRegisterMutation, useGetRegistersQuery } = registerApi
export { registerApi, useCreateRegisterMutation, useGetRegistersQuery }
