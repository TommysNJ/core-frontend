import React, { useEffect, useState } from "react";
import axios from "axios";
import CrearAlumno from "./CrearAlumno";
import EditarAlumno from "./EditarAlumno";

const URI_ALUMNOS = "https://backend-core-proyecto.onrender.com/alumnos";
const URI_USERS = "https://backend-core-proyecto.onrender.com/auth/delete"; // URI para eliminar usuario

const AlumnosAdmin = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [editingAlumnoId, setEditingAlumnoId] = useState(null);

    useEffect(() => {
        fetchAlumnos();
    }, []);

    const fetchAlumnos = async () => {
        try {
            const res = await axios.get(URI_ALUMNOS, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setAlumnos(res.data);
        } catch (error) {
            console.error("Error al obtener los alumnos:", error);
        }
    };

    const handleCreate = () => {
        setIsCreating(true);
        setEditingAlumnoId(null);
    };

    const handleEdit = (id) => {
        setEditingAlumnoId(id);
        setIsCreating(false);
    };

    const handleCancel = () => {
        setIsCreating(false);
        setEditingAlumnoId(null);
    };

    const handleDelete = async (email) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este alumno?");
        if (confirmDelete) {
            try {
                await axios.delete(`${URI_USERS}/${email}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                fetchAlumnos(); // Refrescar lista después de eliminar
            } catch (error) {
                console.error("Error al eliminar el alumno:", error);
            }
        }
    };

    return (
        <div className="alumnos-admin-container">
            <h2>Alumnos</h2>
            {isCreating ? (
                <CrearAlumno onCancel={handleCancel} onRefresh={fetchAlumnos} />
            ) : editingAlumnoId ? (
                <EditarAlumno alumnoId={editingAlumnoId} onCancel={handleCancel} onRefresh={fetchAlumnos} />
            ) : (
                <>
                    <button className="btn-crear-alumno" onClick={handleCreate}>Crear Alumno</button>
                    <div className="alumnos-list">
                        {alumnos.map((alumno) => (
                            <div key={alumno.email} className="alumno-item">
                                <p><strong>Email:</strong> {alumno.email}</p>
                                <p><strong>Nombre:</strong> {alumno.nombre}</p>
                                <p><strong>Género:</strong> {alumno.genero}</p>
                                <p><strong>Edad:</strong> {alumno.edad}</p>
                                <p><strong>Nivel de Educación:</strong> {alumno.nivel_educacion}</p>
                                <button className="btn-editar" onClick={() => handleEdit(alumno.email)}>Editar</button>
                                <button className="btn-eliminar" onClick={() => handleDelete(alumno.email)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AlumnosAdmin;