// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DuenioList from './components/DuenioList';
import DuenioForm from './components/DuenioForm';
import CrearMascota from './components/Mascota/CrearMascota';
import ListarMascotas from './components/Mascota/ListarMascotas';
import CrearCita from './components/Cita/CrearCita';
import ListarCitas from './components/Cita/ListarCitas';
import Facturacion from './components/Facturacion/Facturacion';
import Facturas from './components/Facturacion/Facturas';
import Productos from './components/Facturacion/Productos';
import FacturaEdit from './components/Facturacion/FacturaEdit';
import Dashboard from './components/Dashboard/Dashboard';
/*
      <CrearMascota />
      <ListarMascotas />
      <CrearCita /> 
            <FacturaEdit />

      <ListarCitas />
      <Facturacion />
      <Facturas />
      <FacturaEdit />
      <Route path="/" element={<Facturas />} />
*/
function App() {
  return (
    <Router>
      <div>
        <h1>Pantalla de Inicio</h1>
        <Link to="/creaCita">
          <button>Crear Cita</button>
        </Link>
        <Link to="/facturacion">
          <button>Facturación</button>
        </Link>
        <Link to="/facturas">
          <button>Ver Facturas</button>
        </Link>
        <Link to="/Dashboard">
          <button>Dashboard</button>
        </Link>
      </div>
      
      <Routes>
        <Route path="/creaCita" element={<CrearCita />} />
        <Route path="/facturacion" element={<Facturacion />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/edit/:id" element={<FacturaEdit />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

