import React, { useEffect, useState } from 'react';
import { getMascotas } from '../../services/api';

const ListarMascotas = () => {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await getMascotas();
        setMascotas(response.data);
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
      }
    };
    fetchMascotas();
  }, []);

  return (
    <div>
      <h2>Listado de Mascotas</h2>
      <ul>
        {mascotas.map((mascota) => (
          <li key={mascota.ID_Mascota}>
            {mascota.Nombre} - {mascota.Especie} - {mascota.Raza} - Edad: {mascota.Edad}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarMascotas;
