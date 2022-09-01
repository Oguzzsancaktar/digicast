import { createSlice } from '@reduxjs/toolkit'
import { IRootState } from '../store'
import { authApi } from '../../services/authService'
import IUser from '../../models/Entities/user/IUser'
import { userApi } from '../../services/userService'

type IAuthState = {
  userId: string
  accessToken: string
  user?: IUser
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: localStorage.getItem('userId') || '',
    accessToken: localStorage.getItem('accessToken') || '',
    user: undefined
  } as IAuthState,
  reducers: {
    logout(state: IAuthState) {
      state.userId = ''
      state.accessToken = ''
      state.user = undefined
    }
  },
  extraReducers(builder) {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.userId = action.payload.userId
    })

    builder.addMatcher(userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})

export const { logout } = authSlice.actions

export const selectUser = (state: IRootState) => state.auth.user
export const selectUserId = (state: IRootState) => state.auth.userId
export const selectAccessToken = (state: IRootState) => state.auth.accessToken

export default authSlice.reducer
