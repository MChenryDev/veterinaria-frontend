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

    // Función para descargar los datos en CSV
    const downloadCSV = () => {
        const csvData = data.map(row => `${row.especie},${row.cantidad}`).join('\n');
        const csvContent = `data:text/csv;charset=utf-8,Especie,Cantidad\n${csvData}`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'mascotas_reporte.csv');
        document.body.appendChild(link); // Requerido para que funcione en Firefox
        link.click();
        document.body.removeChild(link);
    };

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
            <button onClick={downloadCSV}>Descargar CSV</button>
        </div>
    );
};

export default MascotasChart;
