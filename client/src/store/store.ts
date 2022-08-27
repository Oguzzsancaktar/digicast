import { configureStore } from '@reduxjs/toolkit'
import reducer from './combineReducers'
import StoreMiddlewares from './StoreMiddlewares'

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(StoreMiddlewares)
})

type IRootState = ReturnType<typeof store.getState>
type IAppDispatch = typeof store.dispatch

export default store
export type { IRootState, IAppDispatch }
