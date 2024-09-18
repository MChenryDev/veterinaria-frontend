// src/components/Facturacion/Productos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productos = ({ agregarProducto }) => {
  const [productos, setProductos] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos')
      .then(response => setProductos(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSeleccionarProducto = () => {
    if (productoSeleccionado && cantidad > 0) {
      agregarProducto({
        Tipo: 'Producto',
        ID_Producto: productoSeleccionado.ID_Producto,
        Cantidad: cantidad,
        Precio: productoSeleccionado.Precio
      });
    }
  };

  return (
    <div>
      <h3>Seleccionar Producto</h3>
      <select onChange={(e) => setProductoSeleccionado(productos.find(p => p.ID_Producto === parseInt(e.target.value)))}>
        <option value="">--Selecciona un producto--</option>
        {productos.map((producto) => (
          <option key={producto.ID_Producto} value={producto.ID_Producto}>
            {producto.Nombre} - {producto.Precio} Q
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => setCantidad(parseInt(e.target.value))}
        placeholder="Cantidad"
      />
      <button onClick={handleSeleccionarProducto}>Agregar Producto</button>
    </div>
  );
};

export default Productos;
