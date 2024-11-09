import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../App.css'; // Asegúrate de importar los estilos

const FacturaEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [factura, setFactura] = useState(null);
    const [detalles, setDetalles] = useState([]);
    const [productos, setProductos] = useState([]);
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/inventarios');
                setProductos(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        
        const fetchServicios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/servicios');
                setServicios(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        const fetchFactura = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/facturas/${id}`);
                setFactura(response.data);
                setDetalles(response.data.detalles || []);
            } catch (error) {
                console.error('Error al cargar la factura', error);
            }
        };

        fetchProductos();
        fetchServicios();
        fetchFactura();
    }, [id]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/facturas/${id}`, { ...factura, detalles });
            navigate('/facturas');
        } catch (error) {
            console.error('Error al actualizar la factura', error);
        }
    };

    const handleDetailChange = (index, field, value) => {
        const newDetalles = [...detalles];
        newDetalles[index] = { ...newDetalles[index], [field]: value };
        setDetalles(newDetalles);
    };

    const addDetail = (e) => {
        e.preventDefault();
        setDetalles([...detalles, { Tipo: 'P', ID_Producto: null, ID_Servicio: null, Cantidad: 1, Precio: 0 }]);
    };

    const removeDetail = (e, index) => {
        e.preventDefault();
        const newDetalles = detalles.filter((_, i) => i !== index);
        setDetalles(newDetalles);
    };

    if (!factura) return <div>Cargando...</div>;

    return (
        <div className="container">
            <h1>Editar Factura {factura.ID_Factura}</h1>
            <form onSubmit={handleSave} className="card">
                <div>
                    <label>Fecha: </label>
                    <input 
                        type="text" 
                        value={factura.Fecha} 
                        onChange={(e) => setFactura({ ...factura, Fecha: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Monto Total: </label>
                    <input 
                        type="number" 
                        value={factura.Monto_Total} 
                        onChange={(e) => setFactura({ ...factura, Monto_Total: e.target.value })} 
                    />
                </div>
                <h3>Detalles de la Factura</h3>
                {detalles.length > 0 ? (
                    detalles.map((detalle, index) => {
                        const opciones = detalle.Tipo === 'P' ? productos : servicios;
                        const selectedId = detalle.Tipo === 'P' ? detalle.ID_Producto : detalle.ID_Servicio;

                        return (
                            <div key={index} className="card" style={{ marginBottom: '10px' }}>
                                <label>Tipo: </label>
                                <select
                                    value={detalle.Tipo}
                                    onChange={(e) => handleDetailChange(index, 'Tipo', e.target.value)}
                                >
                                    <option value="P">Producto</option>
                                    <option value="S">Servicio</option>
                                </select>

                                <div>
                                    <label>{detalle.Tipo === 'P' ? 'Producto' : 'Servicio'}: </label>
                                    <select
                                        value={selectedId || ''}
                                        onChange={(e) => handleDetailChange(index, detalle.Tipo === 'P' ? 'ID_Producto' : 'ID_Servicio', e.target.value)}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        {opciones.map(option => (
                                            <option key={option.ID_Producto || option.ID_Servicio} value={option.ID_Producto || option.ID_Servicio}>
                                                {option.Nombre_Producto || option.Nombre} - Q{option.Precio_Unitario || option.Precio}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <label>Cantidad: </label>
                                <input 
                                    type="number" 
                                    value={detalle.Cantidad} 
                                    onChange={(e) => handleDetailChange(index, 'Cantidad', e.target.value)} 
                                />
                                <label>Precio: </label>
                                <input 
                                    type="number" 
                                    value={detalle.Precio} 
                                    onChange={(e) => handleDetailChange(index, 'Precio', e.target.value)} 
                                />
                                <button className="action-button" onClick={(e) => removeDetail(e, index)}>Eliminar Detalle</button>
                            </div>
                        );
                    })
                ) : (
                    <div>No hay detalles disponibles para esta factura.</div>
                )}
                <div className="action-buttons">
                    <button onClick={addDetail}>Añadir Detalle</button>
                </div>
                <div className="action-buttons">
                    <button type="submit">Guardar Cambios</button>
                </div>
            </form>
        </div>
    );
};

export default FacturaEdit;
