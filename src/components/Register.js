import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({
        Nombre_Usuario: '',
        Contrasenia: '',
        Correo_Electronico: '',
        ID_Rol: 2  // Puedes usar un valor por defecto o un dropdown de roles
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/register', user);
            console.log(response.data);
            window.location.href = '/login'; // Redirige al login tras el registro
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Registro</h2>
                <input type="text" name="Nombre_Usuario" placeholder="Nombre de Usuario" onChange={handleChange} required />
                <input type="email" name="Correo_Electronico" placeholder="Correo Electrónico" onChange={handleChange} required />
                <input type="password" name="Contrasenia" placeholder="Contraseña" onChange={handleChange} required />
                <button type="submit">Registrarse</button>
            </form>
            <p>Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
    );
};

export default Register;
