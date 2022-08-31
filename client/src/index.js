import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './composant/Error'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ContextProvider } from './utils/AuthContext'
import ProtectedRoute from './utils/ProtectedRoute'
import LoginForm from './composant/LoginForm'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
