import React, { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ReporteSubtematicas = () => {
    const [emailInstructor, setEmailInstructor] = useState(""); // Email del instructor
    const [data, setData] = useState([]); // Datos del reporte
    const [chartData, setChartData] = useState(null); // Datos del gráfico
    const [error, setError] = useState(null); // Mensaje de error

    const handleFiltrar = async () => {
        try {
            setError(null);

            // Hacer la llamada al backend
            const response = await axios.get(
                "https://backend-core-proyecto.onrender.com/reports/popularidad-subtematicas-instructor",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    params: { email_instructor: emailInstructor }, // Pasar el email como parámetro
                }
            );

            setData(response.data);

            // Preparar datos para el gráfico de pastel
            const labels = response.data.map((subtema) => subtema.tipo);
            const values = response.data.map((subtema) =>
                parseFloat(subtema.indicePopularidad.replace("%", ""))
            );

            setChartData({
                labels,
                datasets: [
                    {
                        label: "Índice de Popularidad (%)",
                        data: values,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        } catch (err) {
            setError("Error al filtrar los datos. Por favor, revisa el correo ingresado.");
        }
    };

    return (
        <div>
            <h3>Reporte Subtemáticas por Profesor</h3>
            <div className="filtros-container">
                <label>
                    Email del Instructor:
                    <input
                        type="email"
                        placeholder="Ingrese el correo del instructor"
                        value={emailInstructor}
                        onChange={(e) => setEmailInstructor(e.target.value)}
                    />
                </label>
                <button onClick={handleFiltrar} className="btn-filtrar">
                    Filtrar
                </button>
            </div>

            {error && <p>{error}</p>}

            {/* Mostrar los datos en una tabla */}
            {data.length > 0 ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Promedio Calificaciones</th>
                                <th>Porcentaje Inscripciones</th>
                                <th>Índice de Popularidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((subtema, index) => (
                                <tr key={index}>
                                    <td>{subtema.tipo}</td>
                                    <td>{subtema.descripcion}</td>
                                    <td>{subtema.promedioCalificaciones}</td>
                                    <td>{subtema.porcentajeInscripciones}</td>
                                    <td>{subtema.indicePopularidad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Gráfico de pastel */}
                    {chartData && (
                        <div>
                            <h4>Índice de Popularidad</h4>
                            <Pie data={chartData} />
                        </div>
                    )}
                </>
            ) : (
                <p>No hay datos disponibles para el instructor seleccionado.</p>
            )}
        </div>
    );
};

export default ReporteSubtematicas;