import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RoutinesHome } from '../features/routines'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/routines" />} />
        <Route path="/routines" element={<RoutinesHome />} />
        {/* Más rutas irán aquí */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
