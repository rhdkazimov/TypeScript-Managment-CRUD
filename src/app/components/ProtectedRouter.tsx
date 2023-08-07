import React from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '../../routes/consts'

interface IProps {
  children : JSX.Element,
}

export const ProtectedRouter:React.FC<IProps> = ({children}) => {
  if(localStorage.getItem("token")){
    return children
  }
  return <Navigate to={ROUTES.USER.LOGIN}/>
}