import { createApi } from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import IUser from '../models/Entities/user/IUser'
import { IAxiosBaseQueryFn, axiosBaseQuery } from './AxiosBaseQuery'

const USER_REDUCER_PATH = 'userApi'
const USER_TAG_TYPE = 'userTag' as const

const COMPANY_PRICING_TAG = 'companyPricingTag'

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof USER_TAG_TYPE | typeof COMPANY_PRICING_TAG,
  typeof USER_REDUCER_PATH
>

const getUserById = (builder: IBuilder) => {
  return builder.query<IUser, IUser['_id']>({
    query(userId) {
      return {
        url: `/user/${userId}`,
        method: 'GET'
      }
    },
    providesTags(result) {
      if (!result) return [{ type: USER_TAG_TYPE, id: 'LIST' }]
      return [
        { type: USER_TAG_TYPE, id: result._id },
        { type: USER_TAG_TYPE, id: 'LIST' }
      ]
    }
  })
}

const userApi = createApi({
  reducerPath: USER_REDUCER_PATH,
  tagTypes: [USER_TAG_TYPE, COMPANY_PRICING_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getUserById: getUserById(builder)
  })
})

const { useGetUserByIdQuery } = userApi
export { userApi, useGetUserByIdQuery }
