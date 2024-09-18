// src/components/FacturaEdit.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Cambia useHistory por useNavigate

const FacturaEdit = () => {
    const { id } = useParams(); // Obtener el ID de la factura desde la URL
    const navigate = useNavigate(); // Cambia useHistory por useNavigate
    const [factura, setFactura] = useState({ detalles: [] });

    useEffect(() => {
        // Obtener la factura y sus detalles para edición
        axios.get(`http://localhost:3000/api/facturas/${id}`)
            .then(res => setFactura(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFactura({ ...factura, [name]: value });
    };

    const handleDetailChange = (index, e) => {
        const { name, value } = e.target;
        const detalles = [...factura.detalles];
        detalles[index] = { ...detalles[index], [name]: value };
        setFactura({ ...factura, detalles });
    };

    const handleRemoveDetail = (index) => {
        const detalles = [...factura.detalles];
        detalles.splice(index, 1); // Elimina el detalle en el índice especificado
        setFactura({ ...factura, detalles });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/facturas/${id}`, factura)
            .then(() => {
                alert('Factura actualizada correctamente');
                navigate('/facturas'); // Cambia history.push por navigate
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Editar Factura #{id}</h1>
            <form onSubmit={handleSubmit}>
                <label>Monto Total:</label>
                <input
                    type="number"
                    name="Monto_Total"
                    value={factura.Monto_Total || ''}
                    onChange={handleInputChange}
                />

                <label>Estado:</label>
                <input
                    type="text"
                    name="Estado"
                    value={factura.Estado || ''}
                    onChange={handleInputChange}
                />

                <h3>Detalles de la Factura:</h3>
                {factura.detalles.map((detalle, index) => (
                    <div key={index}>
                        <label>Producto ID:</label>
                        <input
                            type="number"
                            name="ID_Producto"
                            value={detalle.ID_Producto}
                            onChange={(e) => handleDetailChange(index, e)}
                        />

                        <label>Cantidad:</label>
                        <input
                            type="number"
                            name="Cantidad"
                            value={detalle.Cantidad}
                            onChange={(e) => handleDetailChange(index, e)}
                        />

                        <label>Precio:</label>
                        <input
                            type="number"
                            name="Precio"
                            value={detalle.Precio}
                            onChange={(e) => handleDetailChange(index, e)}
                        />

                        <button type="button" onClick={() => handleRemoveDetail(index)}>Eliminar Detalle</button>
                    </div>
                ))}

                <button type="submit">Actualizar Factura</button>
            </form>
        </div>
    );
};

export default FacturaEdit;
