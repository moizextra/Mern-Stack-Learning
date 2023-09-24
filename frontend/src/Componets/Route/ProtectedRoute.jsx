import React from 'react'
import Loading from '../Loading'
import {Route} from  "react-router-dom"
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({children}) => { // Here ...rest is options object or parameter we pass to particular Route
  const {isLoading,isAutheticated,userData}=useSelector(state=>state.User)
  if(!isAutheticated){
    return <Navigate to="/login" />
  }
  return children

}

export default ProtectedRoute