// componentes/administrador/gestionCursos/EditarCurso.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const INSTRUCTORES_URI = "https://backend-core-proyecto.onrender.com/instructores";
const TEMAS_URI = "https://backend-core-proyecto.onrender.com/temas";
const UPDATE_COURSE_URI = "https://backend-core-proyecto.onrender.com/cursos";

const EditarCurso = ({ cursoId, onCancel, onRefresh }) => {
    const [curso, setCurso] = useState({
        email_instructor: "",
        id_tema: "",
        nombre: "",
        descripcion: ""
    });
    const [instructores, setInstructores] = useState([]);
    const [temas, setTemas] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCurso = async () => {
            try {
                const res = await axios.get(`${UPDATE_COURSE_URI}/${cursoId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setCurso(res.data);
            } catch (error) {
                console.error("Error al obtener el curso:", error);
                setError("No se pudo cargar la información del curso.");
            }
        };

        const fetchInstructores = async () => {
            try {
                const res = await axios.get(INSTRUCTORES_URI, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setInstructores(res.data);
            } catch (error) {
                console.error("Error al obtener instructores:", error);
                setError("No se pudieron obtener los instructores.");
            }
        };

        const fetchTemas = async () => {
            try {
                const res = await axios.get(TEMAS_URI, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setTemas(res.data);
            } catch (error) {
                console.error("Error al obtener temas:", error);
                setError("No se pudieron obtener los temas.");
            }
        };

        fetchCurso();
        fetchInstructores();
        fetchTemas();
    }, [cursoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurso({ ...curso, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`${UPDATE_COURSE_URI}/${cursoId}`, curso, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            onRefresh(); // Refresca el listado de cursos
            onCancel(); // Navega de regreso al listado de cursos
        } catch (error) {
            console.error("Error al actualizar el curso:", error);
            setError("No se pudo actualizar el curso. Intenta nuevamente.");
        }
    };

    return (
        <div className="editar-curso-container">
            <h2>Editar Curso</h2>
            {error && <p className="error-text">{error}</p>}

            <div className="form-group">
                <label>Instructor</label>
                <select
                    name="email_instructor"
                    value={curso.email_instructor}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un instructor</option>
                    {instructores.map((instructor) => (
                        <option key={instructor.email} value={instructor.email}>
                            {instructor.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Tema</label>
                <select
                    name="id_tema"
                    value={curso.id_tema}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un tema</option>
                    {temas.map((tema) => (
                        <option key={tema.id_tema} value={tema.id_tema}>
                            {tema.tipo}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Nombre del Curso</label>
                <input
                    type="text"
                    name="nombre"
                    value={curso.nombre}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Descripción</label>
                <textarea
                    name="descripcion"
                    value={curso.descripcion}
                    onChange={handleChange}
                    required
                />
            </div>

            <button className="btn-guardar" onClick={handleSave}>Guardar</button>
            <button className="btn-cancelar" onClick={onCancel}>Cancelar</button>
        </div>
    );
};

export default EditarCurso;