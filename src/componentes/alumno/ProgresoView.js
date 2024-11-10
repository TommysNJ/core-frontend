// ProgresoView.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const URI = 'https://backend-core-proyecto.onrender.com/progresos';

const ProgresoView = ({ idInscripcion, onBack }) => {
    const [progresos, setProgresos] = useState([]);
    const [addingProgress, setAddingProgress] = useState(false);
    const [descripcion, setDescripcion] = useState("");
    const [radioOption, setRadioOption] = useState("");
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProgresos();
    }, [idInscripcion]);

    const fetchProgresos = async () => {
        try {
            const res = await axios.get(`${URI}/${idInscripcion}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setProgresos(res.data);
        } catch (error) {
            console.error("Error al obtener los progresos:", error);
            setError("No se encontraron progresos para esta inscripción.");
        }
    };

    const handleAgregarProgreso = () => {
        setAddingProgress(true);
        setDescripcion("");
        setRadioOption("");
    };

    const handleDescripcionChange = (e) => {
        setDescripcion(e.target.value);
        setRadioOption(""); // Desmarcar los radio buttons si se escribe en el textarea
    };

    const handleRadioChange = (e) => {
        setRadioOption(e.target.value);
        setDescripcion(""); // Limpiar el textarea si se selecciona un radio button
    };

    const handleGuardarProgreso = async () => {
        const descripcionToSave = descripcion || radioOption;

        try {
            await axios.post(
                URI,
                {
                    id_inscripcion: idInscripcion,
                    descripcion: descripcionToSave,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setAddingProgress(false);
            fetchProgresos(); // Refrescar la lista de progresos después de agregar
        } catch (error) {
            console.error("Error al guardar el progreso:", error);
            setError("Hubo un problema al intentar guardar el progreso.");
        }
    };

    const handleCancelar = () => {
        setAddingProgress(false);
        setDescripcion("");
        setRadioOption("");
    };

    const handleEliminarProgreso = async (idDetalle) => {
        try {
            await axios.delete(`${URI}/${idDetalle}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setProgresos(progresos.filter(progreso => progreso.id_detalle !== idDetalle));
        } catch (error) {
            console.error("Error al eliminar el progreso:", error);
            setError("Hubo un problema al intentar eliminar el progreso.");
        }
    };

    return (
        <div className="progreso-view">
            <h2>Progreso del Curso</h2>
            {!addingProgress && (
                <button onClick={handleAgregarProgreso} className="btn-agregar-progreso">
                    Agregar Progreso
                </button>
            )}
            {addingProgress ? (
                <div className="progreso-form">
                    <textarea
                        value={descripcion}
                        onChange={handleDescripcionChange}
                        placeholder="Descripción personalizada"
                        disabled={radioOption !== ""}
                    />
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="Curso Completado"
                                checked={radioOption === "Curso Completado"}
                                onChange={handleRadioChange}
                            />
                            Curso Completado
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Abandonar Curso"
                                checked={radioOption === "Abandonar Curso"}
                                onChange={handleRadioChange}
                            />
                            Abandonar Curso
                        </label>
                    </div>
                    <button onClick={handleGuardarProgreso} className="btn-guardar-progreso">Guardar</button>
                    <button onClick={handleCancelar} className="btn-cancelar-progreso">Cancelar</button>
                </div>
            ) : (
                progresos.length > 0 ? (
                    progresos.map((progreso) => (
                        <div key={progreso.id_detalle} className="progreso-item">
                            <p><strong>Fecha de actualización:</strong> {progreso.fecha_actualizacion}</p>
                            <p><strong>Descripción:</strong> {progreso.descripcion}</p>
                            <button 
                                className="btn-eliminar" 
                                onClick={() => handleEliminarProgreso(progreso.id_detalle)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No tienes progresos registrados.</p>
                )
            )}
            <button onClick={onBack} className="btn-regresar">Regresar</button>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default ProgresoView;