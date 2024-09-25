import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const CitasChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/citas') // Ruta API para obtener las citas
            .then((response) => {
                const estados = response.data.reduce((acc, curr) => {
                    const { Estado } = curr;
                    acc[Estado] = (acc[Estado] || 0) + 1;
                    return acc;
                }, {});

                const data = [
                    { estado: 'Pendientes', cantidad: estados['P'] || 0 },
                    { estado: 'Completadas', cantidad: estados['C'] || 0 },
                    { estado: 'Canceladas', cantidad: estados['X'] || 0 }
                ];

                setData(data);
            });
    }, []);

    return (
        <div>
            <h2>Citas por Estado</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="estado" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CitasChart;
