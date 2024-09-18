// src/App.js

import React from 'react';
import DuenioList from './components/DuenioList';
import DuenioForm from './components/DuenioForm';
import CrearMascota from './components/Mascota/CrearMascota';
import ListarMascotas from './components/Mascota/ListarMascotas';
import CrearCita from './components/Cita/CrearCita';
import ListarCitas from './components/Cita/ListarCitas';

const App = () => {
  return (
    <div>
      <h1>Gestión Veterinaria</h1>
      <CrearMascota />
      <ListarMascotas />
      <CrearCita />
      <ListarCitas />
    </div>
  );
};

export default App;

