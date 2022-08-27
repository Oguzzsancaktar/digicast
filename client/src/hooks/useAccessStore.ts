import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { IAppDispatch, IRootState } from '../store'

const useAppDispatch = () => useDispatch<IAppDispatch>()
const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

const useAccessStore = () => ({
  useAppDispatch,
  useAppSelector
})

export default useAccessStore
