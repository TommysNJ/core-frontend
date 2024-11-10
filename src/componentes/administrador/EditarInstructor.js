import React, { useEffect, useState } from "react";
import axios from "axios";

const URI_INSTRUCTORES = "https://backend-core-proyecto.onrender.com/instructores";

const EditarInstructor = ({ instructorId, onCancel, onRefresh }) => {
    const [instructorData, setInstructorData] = useState({
        nombre: "",
        fecha_nacimiento: "",
        profesion: "",
        titulo_profesional: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInstructor = async () => {
            try {
                const res = await axios.get(`${URI_INSTRUCTORES}/${instructorId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setInstructorData(res.data);
            } catch (error) {
                console.error("Error al obtener los datos del instructor:", error);
                setError("No se pudieron obtener los datos del instructor.");
            }
        };
        fetchInstructor();
    }, [instructorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInstructorData({ ...instructorData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URI_INSTRUCTORES}/${instructorId}`, instructorData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            onRefresh(); // Refrescar la lista de instructores
            onCancel();
        } catch (error) {
            console.error("Error al actualizar el instructor:", error);
            setError("No se pudo actualizar el instructor. Intenta nuevamente.");
        }
    };

    return (
        <div className="editar-instructor-form">
            <h2>Editar Instructor</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={instructorData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={instructorData.fecha_nacimiento}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Profesión:</label>
                    <input
                        type="text"
                        name="profesion"
                        value={instructorData.profesion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Título Profesional:</label>
                    <input
                        type="text"
                        name="titulo_profesional"
                        value={instructorData.titulo_profesional}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="btn-guardar" type="submit">Guardar</button>
                <button className="btn-cancelar" onClick={onCancel}>Cancelar</button>
            </form>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default EditarInstructor;