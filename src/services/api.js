// src/services/api.js

import axios from 'axios';

// Configura la URL base de la API
const API_URL = 'http://localhost:3000/api'; // Cambiar si el backend esta en otro puerto o servidor

// Obtener todos los dueños
export const getDuenios = async () => {
  try {
    const response = await axios.get(`${API_URL}/duenios`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los dueños:', error);
    throw error;
  }
};

// Crear un nuevo dueño
export const createDuenio = async (duenioData) => {
  try {
    const response = await axios.post(`${API_URL}/duenios`, duenioData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el dueño:', error);
    throw error;
  }
};

// Función para crear una nueva mascota
export const createMascota = (mascotaData) => {
    return axios.post(`${API_URL}/mascotas`, mascotaData);
  };
  
  // Función para listar mascotas
  export const getMascotas = () => {
    return axios.get(`${API_URL}/mascotas`);
  };
  
  // Función para crear una nueva cita
  export const createCita = (citaData) => {
    return axios.post(`${API_URL}/citas`, citaData);
  };
  
  // Función para listar citas
  export const getCitas = () => {
    return axios.get(`${API_URL}/citas`);
  };
