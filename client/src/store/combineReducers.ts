import { combineReducers } from 'redux'
import { authApi } from '../services/authService'
import { registerApi } from '../services/registerService'
import { userApi } from '../services/userService'
import { AuthReducer } from './auth'

const rootReducer = combineReducers({
  auth: AuthReducer,
  [authApi.reducerPath]: authApi.reducer,
  [registerApi.reducerPath]: registerApi.reducer,
  [userApi.reducerPath]: userApi.reducer
})

export default rootReducer
