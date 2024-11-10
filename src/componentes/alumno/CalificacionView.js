// CalificacionView.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const URI = 'https://backend-core-proyecto.onrender.com/calificaciones';

const CalificacionView = ({ idInscripcion, onBack }) => {
    const [calificacion, setCalificacion] = useState(null);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Estado para mostrar formulario de actualización
    const [newPuntuacion, setNewPuntuacion] = useState('');
    const [newDescripcion, setNewDescripcion] = useState('');

    useEffect(() => {
        const fetchCalificacion = async () => {
            try {
                const res = await axios.get(`${URI}/${idInscripcion}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setCalificacion(res.data);
            } catch (error) {
                console.error("Error al obtener la calificación:", error);
                setError("No se encontró una calificación para esta inscripción.");
            }
        };
        
        fetchCalificacion();
    }, [idInscripcion]);

    const handleCreate = () => {
        setIsEditing(true);
        setNewPuntuacion('');
        setNewDescripcion('');
    };

    const handleUpdate = () => {
        setIsEditing(true);
        setNewPuntuacion(calificacion.puntuacion);
        setNewDescripcion(calificacion.descripcion);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            if (calificacion) {
                // Actualizar calificación existente
                await axios.put(`${URI}/${idInscripcion}`, {
                    puntuacion: newPuntuacion,
                    descripcion: newDescripcion
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            } else {
                // Crear nueva calificación
                await axios.post(URI, {
                    id_inscripcion: idInscripcion,
                    puntuacion: newPuntuacion,
                    descripcion: newDescripcion
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            }

            setIsEditing(false);
            // Refrescar la calificación actual
            const res = await axios.get(`${URI}/${idInscripcion}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setCalificacion(res.data);
        } catch (error) {
            console.error("Error al guardar la calificación:", error);
            setError("No se pudo guardar la calificación. Intenta nuevamente.");
        }
    };

    return (
        <div className="calificacion-view">
            <h2>Calificación del Curso</h2>
            {isEditing ? (
                <div>
                    <div className="form-group">
                        <label>Puntuación (1-10):</label>
                        <input
                            type="number"
                            value={newPuntuacion}
                            onChange={(e) => setNewPuntuacion(e.target.value)}
                            min="1"
                            max="10"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea
                            value={newDescripcion}
                            onChange={(e) => setNewDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn-guardar" onClick={handleSave}>Guardar</button>
                    <button className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
                </div>
            ) : (
                <>
                    {calificacion ? (
                        <div>
                            <p><strong>Puntuación:</strong> {calificacion.puntuacion}</p>
                            <p><strong>Descripción:</strong> {calificacion.descripcion}</p>
                            <button className="btn-calificar" onClick={handleUpdate}>Actualizar</button>
                        </div>
                    ) : (
                        <div>
                            <p>No tienes calificación para este curso.</p>
                            <button className="btn-calificar" onClick={handleCreate}>Crear</button>
                        </div>
                    )}
                    <button onClick={onBack} className="btn-regresar">Regresar</button>
                </>
            )}
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default CalificacionView;