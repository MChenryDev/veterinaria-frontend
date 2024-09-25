import React from 'react';
import DueniosChart from './DueniosChart';
import MascotasChart from './MascotasChart';
import VeterinariosChart from './VeterinariosChart';
import CitasChart from './CitasChart';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard Veterinaria</h1>
            <div className="dashboard-charts">
                <div className="chart-card">
                    <h3>Dueños</h3>
                    <DueniosChart />
                </div>
                <div className="chart-card">
                    <h3>Mascotas</h3>
                    <MascotasChart />
                </div>
                <div className="chart-card">
                    <h3>Veterinarios</h3>
                    <VeterinariosChart />
                </div>
                <div className="chart-card">
                    <h3>Citas</h3>
                    <CitasChart />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
