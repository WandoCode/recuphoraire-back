import { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { Navigate } from 'react-router-dom'
function ProtectedRoute(props) {
  const { state } = useContext(AuthContext)

  if (state.isLoggedIn) return props.children
  else return <Navigate to="/login" />
}

export default ProtectedRoute
