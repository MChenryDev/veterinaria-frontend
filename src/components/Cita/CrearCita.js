import React, { useState, useEffect } from 'react';
import { createCita, getMascotas, getVeterinarios } from '../../services/api';

const CrearCita = () => {
  const [cita, setCita] = useState({
    Fecha_Hora: '',
    Motivo: '',
    ID_Mascota: '',
    ID_Veterinario: '',
  });

  const [mascotas, setMascotas] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);

  useEffect(() => {
    // Obtener la lista de mascotas
    const fetchMascotas = async () => {
      try {
        const response = await getMascotas();
        setMascotas(response.data);
      } catch (error) {
        console.error('Error al cargar mascotas:', error);
      }
    };

    // Obtener la lista de veterinarios
    const fetchVeterinarios = async () => {
      try {
        const response = await getVeterinarios();
        setVeterinarios(response.data);
      } catch (error) {
        console.error('Error al cargar veterinarios:', error);
      }
    };

    fetchMascotas();
    fetchVeterinarios();
  }, []);

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
      <h2>Creación Cita</h2>
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

      <label>Mascota:</label>
      <select name="ID_Mascota" value={cita.ID_Mascota} onChange={handleChange}>
        <option value="">Selecciona una mascota</option>
        {mascotas.map((mascota) => (
          <option key={mascota.ID_Mascota} value={mascota.ID_Mascota}>
            {mascota.Nombre}
          </option>
        ))}
      </select>

      <label>Veterinario:</label>
      <select name="ID_Veterinario" value={cita.ID_Veterinario} onChange={handleChange}>
        <option value="">Selecciona un veterinario</option>
        {veterinarios.map((veterinario) => (
          <option key={veterinario.ID_Veterinario} value={veterinario.ID_Veterinario}>
            {veterinario.Nombre}
          </option>
        ))}
      </select>

      <button type="submit">Registrar Cita</button>
    </form>
  );
};

export default CrearCita;
