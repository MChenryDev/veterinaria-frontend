import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import DuenioList from './components/DuenioList';
import DuenioForm from './components/DuenioForm';
import CrearMascota from './components/Mascota/CrearMascota';
import ListarMascotas from './components/Mascota/ListarMascotas';
import CrearCita from './components/Cita/CrearCita';
import ListarCitas from './components/Cita/ListarCitas';
import Facturacion from './components/Facturacion/Facturacion';
import Facturas from './components/Facturacion/Facturas';
import Servicios from './components/Facturacion/Servicios';
import FacturaEdit from './components/Facturacion/FacturaEdit';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';  // Importa el componente de rutas protegidas
import NavBar from './components/NavBar'; 


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    // Efecto para comprobar el token en cada carga
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);  // Actualiza el estado si hay un token
    }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);  // Actualiza el estado
    window.location.href = '/login';  // Redirige al login
  };

  return (
    <Router>
      <div>
        {/* Usa el NavBar y pasa las props necesarias */}
        <h1>Sistema de Veterinaria</h1>
        <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      </div>

      <Routes>
        {/* Rutas abiertas */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/registro" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/creaCita"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CrearCita />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listarCita"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ListarCitas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creaDuenio"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DuenioForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listarDuenio"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DuenioList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creaMascota"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CrearMascota />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listarMascota"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ListarMascotas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/facturacion"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Facturacion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/facturas"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Facturas />
            </ProtectedRoute>
          }
          
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FacturaEdit />
            </ProtectedRoute>
          }
          
        />
        {/* Redirigir a login si no se encuentra la ruta */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
