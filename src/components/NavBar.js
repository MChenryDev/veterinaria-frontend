import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav>
      {isAuthenticated ? (
        <>
          <Link to="/Dashboard">
            <button>Dashboard</button>
          </Link>
          <Link to="/creaCita">
            <button>Crear Cita</button>
          </Link>
          <Link to="/listarCita">
            <button>Ver Citas</button>
          </Link>
          <Link to="/creaDuenio">
            <button>Crear Dueño</button>
          </Link>
          <Link to="/listarDuenio">
            <button>Ver Dueños</button>
          </Link>
          <Link to="/creaMascota">
            <button>Crear Mascota</button>
          </Link>
          <Link to="/listarMascota">
            <button>Ver Mascotas</button>
          </Link>
          <Link to="/facturacion">
            <button>Facturación</button>
          </Link>
          <Link to="/facturas">
            <button>Ver Facturas</button>
          </Link>
          {/* Botón para cerrar sesión */}
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          {/* Si no está autenticado, muestra las opciones de login y registro */}
          <Link to="/login">
            <button>Iniciar Sesión</button>
          </Link>
          <Link to="/registro">
            <button>Registrarse</button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
