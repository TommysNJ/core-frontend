import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const CantidadInscripciones = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://backend-core-proyecto.onrender.com/reports/porcentaje-inscripciones",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setData(response.data);
            } catch (err) {
                setError("Error al cargar los datos");
            }
        };

        fetchData();
    }, []);

    // Preparar los datos para el gráfico de pastel
    const chartData = {
        labels: data.map((tema) => tema.tipo),
        datasets: [
            {
                label: "Porcentaje de Inscripciones",
                data: data.map((tema) =>
                    parseFloat(tema.porcentajeInscripciones.replace("%", ""))
                ),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
            },
        ],
    };

    return (
        <div>
            <h3>Cantidad de Inscripciones Globales</h3>
            {error && <p>{error}</p>}

            {/* Tabla de datos */}
            {data.length > 0 ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Total Inscripciones</th>
                                <th>Porcentaje Inscripciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((tema, index) => (
                                <tr key={index}>
                                    <td>{tema.tipo}</td>
                                    <td>{tema.descripcion}</td>
                                    <td>{tema.totalInscripciones}</td>
                                    <td>{tema.porcentajeInscripciones}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Gráfico de pastel */}
                    <div>
                        <h4>Porcentaje de Inscripciones por Temática</h4>
                        <Pie data={chartData} />
                    </div>
                </>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};

export default CantidadInscripciones;