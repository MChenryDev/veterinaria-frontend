import React, { useState } from 'react';
import { createMascota } from '../../services/api';

const CrearMascota = () => {
  const [mascota, setMascota] = useState({
    Nombre: '',
    Especie: '',
    Raza: '',
    Edad: '',
    ID_Duenio: '',
  });

  const handleChange = (e) => {
    setMascota({
      ...mascota,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMascota(mascota);
      alert('Mascota registrada exitosamente');
      setMascota({
        Nombre: '',
        Especie: '',
        Raza: '',
        Edad: '',
        ID_Duenio: '',
      });
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Nombre"
        placeholder="Nombre"
        value={mascota.Nombre}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Especie"
        placeholder="Especie"
        value={mascota.Especie}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Raza"
        placeholder="Raza"
        value={mascota.Raza}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Edad"
        placeholder="Edad"
        value={mascota.Edad}
        onChange={handleChange}
      />
      <input
        type="number"
        name="ID_Duenio"
        placeholder="ID del Dueño"
        value={mascota.ID_Duenio}
        onChange={handleChange}
      />
      <button type="submit">Registrar Mascota</button>
    </form>
  );
};

export default CrearMascota;
