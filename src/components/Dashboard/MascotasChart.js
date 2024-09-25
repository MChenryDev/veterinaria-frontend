import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const MascotasChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/mascotas') // Ruta API para obtener las mascotas
            .then((response) => {
                const especies = response.data.reduce((acc, curr) => {
                    const { Especie } = curr;
                    acc[Especie] = (acc[Especie] || 0) + 1;
                    return acc;
                }, {});

                const data = Object.keys(especies).map((key) => ({
                    especie: key,
                    cantidad: especies[key]
                }));
                setData(data);
            });
    }, []);

    return (
        <div>
            <h2>Mascotas por Especie</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="especie" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MascotasChart;
