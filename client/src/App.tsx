import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PrivateRoute } from './routes/PrivateRoute'
import GlobalStyle from './styles/GlobalStyle'
import { RegisterPage } from './views'

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalStyle />

      <Routes>
        <Route path="/admin" element={<PrivateRoute>Home</PrivateRoute>} />
        <Route path="*" element={<Navigate to="/register" replace />} />
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <ToastContainer />
    </Suspense>
  )
}

export default App
