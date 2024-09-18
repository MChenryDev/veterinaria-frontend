// src/components/DuenioList.js

import React, { useState, useEffect } from 'react';
import { getDuenios } from '../services/api';

const DuenioList = () => {
  const [duenios, setDuenios] = useState([]);

  useEffect(() => {
    // Cargar los dueños al montar el componente
    const fetchDuenios = async () => {
      try {
        const data = await getDuenios();
        setDuenios(data);
      } catch (error) {
        console.error('Error al obtener los dueños:', error);
      }
    };
    fetchDuenios();
  }, []);

  return (
    <div>
      <h2>Lista de Dueños</h2>
      <ul>
        {duenios.map(duenio => (
          <li key={duenio.ID}>{duenio.Nombre} - {duenio.Telefono}</li>
        ))}
      </ul>
    </div>
  );
};

export default DuenioList;
