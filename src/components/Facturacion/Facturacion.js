// src/components/Facturacion/Facturacion.js
import React, { useState } from 'react';
import axios from 'axios';
import Servicios from './Servicios'; // Importamos el componente de servicios
import Productos from './Productos'; // Importamos el componente de productos/inventario

const Facturacion = () => {
  const [detallesFactura, setDetallesFactura] = useState([]);
  const [idCita, setIdCita] = useState('');

  const calcularMontoTotal = () => {
    return detallesFactura.reduce((total, detalle) => total + detalle.Precio * detalle.Cantidad, 0);
  };

  const agregarDetalle = (detalle) => {
    setDetallesFactura([...detallesFactura, detalle]);
  };

  /*const crearFactura = () => {
    const payload = {
      ID_Cita: idCita,
      Detalles: detallesFactura
    };*/
    const crearFactura = () => {
      const montoTotal = calcularMontoTotal();

      if (!idCita || detallesFactura.length === 0) {
        console.log('Debe ingresar un ID de cita y al menos un detalle');
        return;
      }
      
      const payload = {
        ID_Cita: idCita,
        Monto_Total: montoTotal,  // Asegúrate de enviar el total
        Detalles: detallesFactura
      };

    

    axios.post('http://localhost:3000/api/facturas', payload) // Ajusta el endpoint según tu backend
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

      {/* Agregar productos desde inventario */}
      <Productos agregarProducto={agregarDetalle} />

      {/* Agregar servicios */}
      <Servicios agregarServicio={agregarDetalle} />

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
