import React from 'react'
import { isAuthenticated } from './isAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'

export const RequireAuth = () => {
  return isAuthenticated() ? <Outlet />  : <Navigate to={'/login'} replace />
}
