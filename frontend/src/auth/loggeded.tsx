
import { isAuthenticated } from './isAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'

export const Loggeded = () => {
  return isAuthenticated() ? <Navigate to={'/'} /> : <Outlet />
}
