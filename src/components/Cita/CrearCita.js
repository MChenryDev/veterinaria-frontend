import React, { useState } from 'react';
import { createCita } from '../../services/api';

const CrearCita = () => {
  const [cita, setCita] = useState({
    Fecha_Hora: '',
    Motivo: '',
    ID_Mascota: '',
    ID_Veterinario: '',
  });

  const handleChange = (e) => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCita(cita);
      alert('Cita registrada exitosamente');
      setCita({
        Fecha_Hora: '',
        Motivo: '',
        ID_Mascota: '',
        ID_Veterinario: '',
      });
    } catch (error) {
      console.error('Error al registrar la cita:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="datetime-local"
        name="Fecha_Hora"
        value={cita.Fecha_Hora}
        onChange={handleChange}
        placeholder="Fecha y Hora"
      />
      <input
        type="text"
        name="Motivo"
        placeholder="Motivo"
        value={cita.Motivo}
        onChange={handleChange}
      />
      <input
        type="number"
        name="ID_Mascota"
        placeholder="ID de la Mascota"
        value={cita.ID_Mascota}
        onChange={handleChange}
      />
      <input
        type="number"
        name="ID_Veterinario"
        placeholder="ID del Veterinario"
        value={cita.ID_Veterinario}
        onChange={handleChange}
      />
      <button type="submit">Registrar Cita</button>
    </form>
  );
};

export default CrearCita;
