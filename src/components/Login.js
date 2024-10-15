import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // useNavigate para redirigir después de iniciar sesión
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
    const [credentials, setCredentials] = useState({
        Correo_Electronico: '',
        Contrasenia: ''
    });

    const navigate = useNavigate();  // Inicializa useNavigate para redirigir después del login

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', credentials);
            localStorage.setItem('token', response.data.token);  // Guardar el token en localStorage
            setIsAuthenticated(true);  // Actualizar el estado de autenticación en App.js
            navigate('/Dashboard');  // Redirige al dashboard tras el login exitoso
        } catch (error) {
            console.error('Error en la autenticación:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    name="Correo_Electronico"
                    placeholder="Correo Electrónico"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="Contrasenia"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </div>
    );
};

export default Login;
