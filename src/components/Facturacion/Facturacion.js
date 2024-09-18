// src/components/Facturacion/Facturacion.js
import React, { useState } from 'react';
import axios from 'axios';
import Servicios from './Servicios'; // Importamos el componente de servicios
import Productos from './Productos'; // Importamos productos

const Facturacion = () => {
  const [detallesFactura, setDetallesFactura] = useState([]);
  const [idCita, setIdCita] = useState('');

  const agregarDetalle = (detalle) => {
    setDetallesFactura([...detallesFactura, detalle]);
  };

  const crearFactura = () => {
    const payload = {
      ID_Cita: idCita,
      Detalles: detallesFactura
    };

    axios.post('http://localhost:3000/api/facturas', payload) // Ajusta el endpoint
      .then(response => {
        console.log('Factura creada exitosamente:', response.data);
        // Reiniciar formulario después de creación
        setIdCita('');
        setDetallesFactura([]);
      })
      .catch(error => console.log('Error al crear la factura:', error));
  };

  return (
    <div>
      <h2>Crear Factura</h2>
      
      {/* Campo para la ID de la cita */}
      <div>
        <label>ID Cita:</label>
        <input
          type="text"
          value={idCita}
          onChange={(e) => setIdCita(e.target.value)}
          placeholder="Ingresa el ID de la cita"
        />
      </div>

      {/* Agregar servicios */}
      <Servicios agregarServicio={agregarDetalle} />
      <Productos agregarProducto={agregarDetalle} />

      {/* Mostrar detalles de la factura */}
      <h3>Detalles de la Factura:</h3>
      <ul>
        {detallesFactura.map((detalle, index) => (
          <li key={index}>
            {detalle.Tipo === 'P' ? `Producto ID: ${detalle.ID_Producto}` : `Servicio ID: ${detalle.ID_Servicio}`} 
            - Cantidad: {detalle.Cantidad}, Precio: {detalle.Precio} Q
          </li>
        ))}
      </ul>

      {/* Botón para crear la factura */}
      <button onClick={crearFactura}>Crear Factura</button>
    </div>
  );
};



export default Facturacion;
