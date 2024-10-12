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
import Servicios from './components/Facturacion/Servicios';
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
        <Link to="/Dashboard">
          <button>Dashboard</button>
        </Link>
        <Link to="/creaCita">
          <button>Crear Cita</button>
        </Link>
        <Link to="/listarCita">
          <button>Ver Citas</button>
        </Link>
        <Link to="/creaDuenio">
          <button>Crear Dueño</button>
        </Link>
        <Link to="/listarDuenio">
          <button>Ver Dueños</button>
        </Link>
        <Link to="/creaMascota">
          <button>Crear Mascota</button>
        </Link>
        <Link to="/listaMascota">
          <button>Ver Mascotas</button>
        </Link>
        <Link to="/facturacion">
          <button>Facturación</button>
        </Link>
        <Link to="/facturas">
          <button>Ver Facturas</button>
        </Link>
      </div>
      
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/creaCita" element={<CrearCita />} />
        <Route path="/listarCita" element={<ListarCitas />} />
        <Route path="/creaDuenio" element={<DuenioForm />} />
        <Route path="/listarDuenio" element={<DuenioList />} />
        <Route path="/creaMascota" element={<CrearMascota />} />
        <Route path="/listaMascota" element={<ListarMascotas />} />
        <Route path="/facturacion" element={<Facturacion />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/edit/:id" element={<FacturaEdit />} />
      </Routes>
    </Router>
  );
}

export default App;

