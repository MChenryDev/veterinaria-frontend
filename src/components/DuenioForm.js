// src/components/DuenioForm.js

import React, { useState } from 'react';
import { createDuenio } from '../services/api';

const DuenioForm = ({ onAddDuenio }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDuenio = {
      Nombre: nombre,
      Direccion: direccion,
      Telefono: telefono,
      Correo_Electronico: correo,
    };
    try {
      await createDuenio(newDuenio);
      onAddDuenio(); // Llama la función pasada para actualizar la lista
      setNombre('');
      setDireccion('');
      setTelefono('');
      setCorreo('');
    } catch (error) {
      console.error('Error al crear el dueño:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Dueño</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Dirección:</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Correo Electrónico:</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>
      <button type="submit">Crear Dueño</button>
    </form>
  );
};

export default DuenioForm;
