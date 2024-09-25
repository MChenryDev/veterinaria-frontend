import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const VeterinariosChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/api/veterinarios') // Ruta API para obtener veterinarios
            .then((response) => {
                const especialidades = response.data.reduce((acc, curr) => {
                    const { Especialidad } = curr;
                    acc[Especialidad] = (acc[Especialidad] || 0) + 1;
                    return acc;
                }, {});

                const data = Object.keys(especialidades).map((key) => ({
                    name: key,
                    value: especialidades[key]
                }));
                setData(data);
            });
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <h2>Veterinarios por Especialidad</h2>
            <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VeterinariosChart;
