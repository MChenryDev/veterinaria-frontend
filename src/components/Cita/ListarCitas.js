import React, { useEffect, useState } from 'react';
import { getCitas } from '../../services/api';

const ListarCitas = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await getCitas();
        setCitas(response.data);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      }
    };
    fetchCitas();
  }, []);

  return (
    <div>
      <h2>Listado de Citas</h2>
      <ul>
        {citas.map((cita) => (
          <li key={cita.ID_Cita}>
            Fecha: {new Date(cita.Fecha_Hora).toLocaleString()} - Motivo: {cita.Motivo} - Estado: {cita.Estado}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarCitas;
