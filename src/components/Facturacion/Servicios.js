// src/components/Facturacion/Servicios.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Servicios = ({ agregarServicio }) => {
  const [servicios, setServicios] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  useEffect(() => {
    // Llama a la API para obtener los servicios
    axios.get('http://localhost:3000/api/servicios') // Ajusta el endpoint según tu backend
      .then(response => setServicios(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSeleccionarServicio = () => {
    if (servicioSeleccionado && cantidad > 0) {
      agregarServicio({
        Tipo: 'S',
        ID_Servicio: servicioSeleccionado.ID_Servicio,
        Cantidad: cantidad,
        Precio: servicioSeleccionado.Precio
      });
    }
  };

  return (
    <div>
      <h3>Seleccionar Servicio</h3>
      <select onChange={(e) => setServicioSeleccionado(servicios.find(s => s.ID_Servicio === parseInt(e.target.value)))}>
        <option value="">--Selecciona un servicio--</option>
        {servicios.map((servicio) => (
          <option key={servicio.ID_Servicio} value={servicio.ID_Servicio}>
            {servicio.Nombre} - {servicio.Precio} Q
          </option>
        ))}
      </select>

      <label>Cantidad:</label>
      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => setCantidad(parseInt(e.target.value))}
        placeholder="Cantidad"
      />
      <button onClick={handleSeleccionarServicio}>Agregar Servicio</button>
    </div>
  );
};

export default Servicios;
