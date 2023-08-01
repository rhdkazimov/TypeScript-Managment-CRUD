import React from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '../../routes/consts'

interface IProps {
  children : JSX.Element,
}

export const ProtectedLoginRouter :  React.FC<IProps> = ({children}) => {
  if(localStorage.getItem("token")){
   return <Navigate to={ROUTES.USER.ALLDATAS}/>
  }
  return children
}
