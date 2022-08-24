import { authApi } from "../services/authService"

const StoreMiddlewares = [
  authApi.middleware,
]

export default StoreMiddlewares
