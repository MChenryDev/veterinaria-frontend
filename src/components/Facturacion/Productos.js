// src/components/Facturacion/Productos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productos = ({ agregarProducto }) => {
  const [inventario, setInventario] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    // Llama a la API del inventario para obtener los productos
    axios.get('http://localhost:3000/api/inventarios') // Ajusta el endpoint según tu backend
      .then(response => setInventario(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSeleccionarProducto = () => {
    if (productoSeleccionado && cantidad > 0) {
      agregarProducto({
        Tipo: 'P',
        ID_Producto: productoSeleccionado.ID_Producto, // Usamos el ID del inventario
        Cantidad: cantidad,
        Precio: productoSeleccionado.Precio_Unitario // Usamos el precio unitario del inventario
      });
    }
  };

  return (
    <div>
      <h3>Seleccionar Producto del Inventario</h3>
      <select onChange={(e) => setProductoSeleccionado(inventario.find(p => p.ID_Producto === parseInt(e.target.value)))}>
        <option value="">--Selecciona un producto--</option>
        {inventario.map((producto) => (
          <option key={producto.ID_Producto} value={producto.ID_Producto}>
            {producto.Nombre_Producto} - {producto.Precio_Unitario} Q
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
