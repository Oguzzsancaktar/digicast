import { authApi } from '../services/authService'
import { registerApi } from '../services/registerService'
import { userApi } from '../services/userService'

const StoreMiddlewares = [authApi.middleware, registerApi.middleware, userApi.middleware]

export default StoreMiddlewares
