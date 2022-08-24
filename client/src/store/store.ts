import { configureStore } from '@reduxjs/toolkit'
import reducer from './auth/authSlice'

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

type IRootState = ReturnType<typeof store.getState>
type IAppDispatch = typeof store.dispatch

export default store
export type { IRootState, IAppDispatch }
