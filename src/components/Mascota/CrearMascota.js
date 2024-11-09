import React, { useState, useEffect } from 'react';
import { createMascota, getDuenios } from '../../services/api';

const CrearMascota = () => {
  const [mascota, setMascota] = useState({
    Nombre: '',
    Especie: '',
    Raza: '',
    Edad: '',
    ID_Duenio: '',
  });

  const [duenios, setDuenios] = useState([]);

  useEffect(() => {
    // Cargar la lista de dueños
    const fetchDuenios = async () => {
      try {
        const data = await getDuenios();
        setDuenios(data);
      } catch (error) {
        console.error('Error al cargar los dueños:', error);
      }
    };

    fetchDuenios();
  }, []);

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
      <h2>Creación Mascota</h2>
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

      <label>Dueño:</label>
      <select name="ID_Duenio" value={mascota.ID_Duenio} onChange={handleChange}>
        <option value="">Selecciona un dueño</option>
        {duenios.map((duenio) => (
          <option key={duenio.ID_Duenio} value={duenio.ID_Duenio}>
            {duenio.Nombre}
          </option>
        ))}
      </select>

      <button type="submit">Registrar Mascota</button>
    </form>
  );
};

export default CrearMascota;
