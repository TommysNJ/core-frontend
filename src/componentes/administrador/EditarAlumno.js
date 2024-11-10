import React, { useState, useEffect } from "react";
import axios from "axios";

const URI_ALUMNOS = "https://backend-core-proyecto.onrender.com/alumnos";

const EditarAlumno = ({ alumnoId, onCancel, onRefresh }) => {
    const [alumno, setAlumno] = useState({
        nombre: "",
        genero: "",
        edad: "",
        nivel_educacion: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAlumno = async () => {
            try {
                const res = await axios.get(`${URI_ALUMNOS}/${alumnoId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setAlumno(res.data);
            } catch (error) {
                console.error("Error al obtener la información del alumno:", error);
                setError("No se pudo cargar la información del alumno.");
            }
        };

        fetchAlumno();
    }, [alumnoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlumno({ ...alumno, [name]: value });
    };

    const handleGeneroChange = (e) => {
        setAlumno({ ...alumno, genero: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`${URI_ALUMNOS}/${alumnoId}`, alumno, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            onRefresh(); // Refresca el listado de alumnos
            onCancel();  // Regresa a la vista de listado
        } catch (error) {
            console.error("Error al actualizar el alumno:", error);
            setError("No se pudo guardar la información del alumno. Intenta nuevamente.");
        }
    };

    return (
        <div className="editar-alumno-container">
            <h2>Editar Alumno</h2>
            <div className="form-group">
                <label>Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={alumno.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Género</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="genero"
                            value="Masculino"
                            checked={alumno.genero === "Masculino"}
                            onChange={handleGeneroChange}
                            required
                        />
                        Masculino
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="genero"
                            value="Femenino"
                            checked={alumno.genero === "Femenino"}
                            onChange={handleGeneroChange}
                        />
                        Femenino
                    </label>
                </div>
            </div>
            <div className="form-group">
                <label>Edad</label>
                <input
                    type="number"
                    name="edad"
                    value={alumno.edad}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Nivel de Educación</label>
                <input
                    type="text"
                    name="nivel_educacion"
                    value={alumno.nivel_educacion}
                    onChange={handleChange}
                    required
                />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button className="btn-guardar" onClick={handleSave}>Guardar</button>
            <button className="btn-cancelar" onClick={onCancel}>Cancelar</button>
        </div>
    );
};

export default EditarAlumno;