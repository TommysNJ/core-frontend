import React, { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const FiltrosReporte = () => {
    const [genero, setGenero] = useState(""); // Género seleccionado
    const [rangoEdadInicio, setRangoEdadInicio] = useState(""); // Inicio del rango de edad
    const [rangoEdadFin, setRangoEdadFin] = useState(""); // Fin del rango de edad
    const [data, setData] = useState([]); // Datos del reporte
    const [chartData, setChartData] = useState(null); // Datos del gráfico
    const [error, setError] = useState(null); // Mensaje de error

    const handleFiltrar = async () => {
        try {
            setError(null);
            const params = {};

            // Agregar filtros si están disponibles
            if (genero) params.genero = genero;
            if (rangoEdadInicio && rangoEdadFin) {
                params.rangoEdadInicio = rangoEdadInicio;
                params.rangoEdadFin = rangoEdadFin;
            }

            // Hacer la llamada al backend con los parámetros
            const response = await axios.get(
                "https://backend-core-proyecto.onrender.com/reports/popularidad-temas-filtros",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    params, // Pasar los filtros como parámetros
                }
            );

            setData(response.data);

            // Preparar datos para el gráfico de pastel
            const labels = response.data.map((tema) => tema.tipo);
            const values = response.data.map((tema) =>
                parseFloat(tema.indicePopularidad.replace("%", ""))
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
            setError("Error al filtrar los datos. Por favor, revisa los parámetros.");
        }
    };

    return (
        <div>
            <h3>Reporte con Filtros</h3>
            <div className="filtros-container">
                <label>
                    Género:
                    <select
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </label>
                <label>
                    Rango de Edad:
                    <input
                        type="number"
                        placeholder="Mínimo"
                        value={rangoEdadInicio}
                        onChange={(e) => setRangoEdadInicio(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Máximo"
                        value={rangoEdadFin}
                        onChange={(e) => setRangoEdadFin(e.target.value)}
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
                            {data.map((tema, index) => (
                                <tr key={index}>
                                    <td>{tema.tipo}</td>
                                    <td>{tema.descripcion}</td>
                                    <td>{tema.promedioCalificaciones}</td>
                                    <td>{tema.porcentajeInscripciones}</td>
                                    <td>{tema.indicePopularidad}</td>
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
                <p>No hay datos disponibles para los filtros seleccionados.</p>
            )}
        </div>
    );
};

export default FiltrosReporte;