import { createContext, useState } from 'react'

const AuthContext = createContext(null)

const initialState = {
  username: null,
  isLoggedIn: false,
}

function ContextProvider(props) {
  const [state, setState] = useState(initialState)

  const logIn = (username) => {
    setState({ username, isLoggedIn: true })
  }

  const logOut = () => {
    setState(initialState)
  }
  return (
    <AuthContext.Provider value={{ state, logIn, logOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, ContextProvider }
