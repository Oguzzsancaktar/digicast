import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IAxiosBaseQueryFn, axiosBaseQuery } from './AxiosBaseQuery'

const AUTH_API_REDUCER_PATH = 'authApi'
const AUTH_TAG = 'authTag'

type IBuilder = EndpointBuilder<IAxiosBaseQueryFn, typeof AUTH_TAG, typeof AUTH_API_REDUCER_PATH>

const login = (builder: IBuilder) => {
  return builder.mutation<any, any>({
    query(credentials) {
      return {
        url: '/auth/login',
        method: 'POST',
        data: credentials
      }
    }
  })
}

const logout = (builder: IBuilder) => {
  return builder.mutation<void, void>({
    query() {
      return {
        url: '/auth/logout',
        method: 'DELETE'
      }
    }
  })
}

const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_PATH,
  tagTypes: [AUTH_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    login: login(builder),
    logout: logout(builder)
  })
})

const { useLoginMutation, useLogoutMutation } = authApi

export { authApi, useLoginMutation, useLogoutMutation }
