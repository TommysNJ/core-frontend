import React, { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PopularidadTemas = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(
                "https://backend-core-proyecto.onrender.com/reports/popularidad-temas",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setData(response.data);
        } catch (err) {
            setError("Error al obtener los datos. Intenta nuevamente.");
        }
        setLoading(false);
    };

    // Preparar datos para el gráfico
    const chartData = {
        labels: data.map((item) => item.tipo),
        datasets: [
            {
                label: "Índice de Popularidad",
                data: data.map((item) =>
                    parseFloat(item.indicePopularidad.replace("%", ""))
                ),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="popularidad-temas-container">
            <h2>Popularidad de Temáticas con Calificación</h2>
            <button onClick={handleFetchData} className="btn-fetch">
                Ver Popularidad de Temas
            </button>

            {loading && <p>Cargando datos...</p>}
            {error && <p className="error">{error}</p>}

            {data.length > 0 && (
                <>
                    {/* Tabla con los datos */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Promedio de Calificaciones</th>
                                <th>Porcentaje de Inscripciones</th>
                                <th>Índice de Popularidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.tipo}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.promedioCalificaciones}</td>
                                    <td>{item.porcentajeInscripciones}</td>
                                    <td>{item.indicePopularidad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Gráfico de pastel */}
                    <div className="chart-container">
                        <h3>Índice de Popularidad</h3>
                        <Pie data={chartData} />
                    </div>
                </>
            )}
        </div>
    );
};

export default PopularidadTemas;