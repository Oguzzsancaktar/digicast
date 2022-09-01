import { useEffect } from 'react'
import { RouteProps, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const PrivateRoute = ({ children }: RouteProps) => {
  const navigate = useNavigate()
  const {
    loggedUser: { accessToken, user }
  } = useAuth()

  useEffect(() => {
    if (!accessToken) {
      console.log(123412341232134)
      navigate('/login')
    }
  }, [accessToken, user])

  return <>{children}</>
}
