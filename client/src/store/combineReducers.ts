import { combineReducers } from 'redux'
import { registerApi } from '../services/registerService'
// import { AuthReducer } from './auth'

const rootReducer = combineReducers({
  // auth: AuthReducer,
  [registerApi.reducerPath]: registerApi.reducer
})

export default rootReducer
