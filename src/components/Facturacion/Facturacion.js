// src/components/Facturacion/Facturacion.js
import React, { useState } from 'react';
import axios from 'axios';
import Servicios from './Servicios'; 
import Productos from './Productos'; 

const Facturacion = () => {
    const [detallesFactura, setDetallesFactura] = useState([]);
    const [idCita, setIdCita] = useState('');

    const calcularMontoTotal = () => {
        return detallesFactura.reduce((total, detalle) => total + detalle.Precio * detalle.Cantidad, 0);
    };

    const agregarDetalle = (detalle) => {
        setDetallesFactura([...detallesFactura, detalle]);
    };

    const crearFactura = (e) => {
        e.preventDefault();
        const montoTotal = calcularMontoTotal();

        if (!idCita || detallesFactura.length === 0) {
            console.log('Debe ingresar un ID de cita y al menos un detalle');
            return;
        }

        const payload = {
            ID_Cita: idCita,
            Monto_Total: montoTotal, 
            Detalles: detallesFactura
        };

        axios.post('http://localhost:3000/api/facturas', payload)
            .then(response => {
                console.log('Factura creada exitosamente:', response.data);
                setIdCita('');
                setDetallesFactura([]);
            })
            .catch(error => console.log('Error al crear la factura:', error));
    };

    return (
        <div className="container">
            <h2>Crear Factura</h2>

            <form onSubmit={crearFactura}>
                <div>
                    <label>ID Cita:</label>
                    <input
                        type="text"
                        value={idCita}
                        onChange={(e) => setIdCita(e.target.value)}
                        placeholder="Ingresa el ID de la cita"
                    />
                </div>

                <Productos agregarProducto={agregarDetalle} />
                <Servicios agregarServicio={agregarDetalle} />

                <h3>Detalles de la Factura:</h3>
                <ul>
                    {detallesFactura.map((detalle, index) => (
                        <li key={index}>
                            {detalle.Tipo === 'P' ? `Producto ID: ${detalle.ID_Producto}` : `Servicio ID: ${detalle.ID_Servicio}`} 
                            - Cantidad: {detalle.Cantidad}, Precio: {detalle.Precio} Q
                        </li>
                    ))}
                </ul>

                <button type="submit">Crear Factura</button>
            </form>
        </div>
    );
};

export default Facturacion;
