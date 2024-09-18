// src/App.js

import React from 'react';
import DuenioList from './components/DuenioList';
import DuenioForm from './components/DuenioForm';
import CrearMascota from './components/Mascota/CrearMascota';
import ListarMascotas from './components/Mascota/ListarMascotas';
import CrearCita from './components/Cita/CrearCita';
import ListarCitas from './components/Cita/ListarCitas';
import Facturacion from './components/Facturacion/Facturacion';
import Facturas from './components/Facturacion/Facturas';
import Productos from './components/Facturacion/Productos';
/*import FacturaEdit from './components/Facturacion/FacturaEdit';*/
/*
      <CrearMascota />
      <ListarMascotas />
      <CrearCita /> 
            <FacturaEdit />
*/
const App = () => {
  return (
    <div>
      <h1>Gestión Veterinaria</h1>
      
      <ListarCitas />
      <Facturacion />
      <Facturas />

    </div>
  );
};

export default App;

