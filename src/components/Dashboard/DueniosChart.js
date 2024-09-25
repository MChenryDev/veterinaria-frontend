import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const DueniosChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/duenios') // Ruta API para obtener los dueños
            .then((response) => {
                const dueniosActivos = response.data.filter(d => d.Estado === 'A').length;
                const dueniosInactivos = response.data.filter(d => d.Estado === 'I').length;
                setData([
                    { name: 'Activos', value: dueniosActivos },
                    { name: 'Inactivos', value: dueniosInactivos }
                ]);
            });
    }, []);

    const COLORS = ['#0088FE', '#FF8042'];

    return (
        <div>
            <h2>Dueños Activos vs Inactivos</h2>
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

export default DueniosChart;
