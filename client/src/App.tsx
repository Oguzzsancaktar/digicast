import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PrivateRoute } from './routes/PrivateRoute'
import GlobalStyle from './styles/GlobalStyle'
import './styles/vendors/react-data-table.css'

const RegisterPage = lazy(() => import('./views/pages/RegisterPage'))
const LoginPage = lazy(() => import('./views/pages/LoginPage'))
const RegisterListPage = lazy(() => import('./views/pages/RegisterListPage'))

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalStyle />

      <Routes>
        <Route path="/admin" element={<LoginPage />} />

        <Route
          path="/registerList"
          element={
            <PrivateRoute>
              <RegisterListPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/register" replace />} />
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <ToastContainer />
    </Suspense>
  )
}

export default App
