// src/components/Facturas.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Facturas = () => {
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/facturas/con-detalles') 
            .then(res => {
                setFacturas(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id, e) => {
        e.preventDefault();
        if (window.confirm('¿Seguro que quieres eliminar esta factura?')) {
            axios.delete(`http://localhost:3000/api/facturas/${id}`)
                .then(() => {
                    setFacturas(facturas.filter(factura => factura.ID_Factura !== id));
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    const handleEdit = (id, e) => {
        e.preventDefault();
        navigate(`/edit/${id}`);
    };

    if (loading) {
        return <p>Cargando facturas...</p>;
    }

    return (
        <div className="container">
            <h1>Facturas</h1>
            {facturas.map(factura => (
                <div className="card" key={factura.ID_Factura}>
                    <h2>Factura #{factura.ID_Factura}</h2>
                    <p>Fecha: {factura.Fecha}</p>
                    <p>Monto Total: {factura.Monto_Total}</p>
                    <p>Estado: {factura.Estado}</p>
                    <h3>Detalles:</h3>
                    <ul>
                        {(factura.detalles || []).map((detalle, index) => (
                            <li key={index}>
                                Producto ID: {detalle.ID_Producto}, Cantidad: {detalle.Cantidad}, Precio: {detalle.Precio}
                            </li>
                        ))}
                    </ul>
                    <div className="action-buttons">
                        <button onClick={(e) => handleEdit(factura.ID_Factura, e)}>Editar</button>
                        <button onClick={(e) => handleDelete(factura.ID_Factura, e)}>Eliminar</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Facturas;
