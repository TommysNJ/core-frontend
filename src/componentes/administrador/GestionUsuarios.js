import React, { useState } from "react";
import AlumnosAdmin from "./AlumnosAdmin";
import InstructoresAdmin from "./InstructoresAdmin";
import axios from "axios";

const ALUMNO_URI = "https://backend-core-proyecto.onrender.com/alumnos";
const INSTRUCTOR_URI = "https://backend-core-proyecto.onrender.com/instructores";
const USER_URI = "https://backend-core-proyecto.onrender.com/auth";

const GestionUsuarios = () => {
    const [view, setView] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [error, setError] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        setError("");
        setSearchResult(null);
        setIsEditing(false);

        try {
            const alumnoRes = await axios.get(`${ALUMNO_URI}/${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (alumnoRes.data) {
                setSearchResult({ type: "Alumno", data: alumnoRes.data });
                return;
            }
        } catch (error) {
            console.error("Error al buscar alumno:", error);
        }

        try {
            const instructorRes = await axios.get(`${INSTRUCTOR_URI}/${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (instructorRes.data) {
                setSearchResult({ type: "Instructor", data: instructorRes.data });
            } else {
                setError("No se encontró un usuario con ese email.");
            }
        } catch (error) {
            console.error("Error al buscar instructor:", error);
            setError("No se encontró un usuario con ese email.");
        }
    };

    const handleEdit = () => {
        setEditedData(searchResult.data);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveEdit = async () => {
        const { type, data } = searchResult;
        const endpoint = type === "Alumno" ? `${ALUMNO_URI}/${data.email}` : `${INSTRUCTOR_URI}/${data.email}`;
        
        try {
            await axios.put(endpoint, editedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setSearchResult({ ...searchResult, data: editedData });
            setIsEditing(false);
        } catch (error) {
            console.error("Error al guardar cambios:", error);
            setError("No se pudo guardar la información. Intenta nuevamente.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleDelete = async () => {
        const email = searchResult.data.email;

        // Mostrar confirmación antes de eliminar
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (!confirmDelete) return; // Si el usuario cancela, salir de la función

        try {
            await axios.delete(`${USER_URI}/delete/${email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setSearchResult(null); // Limpiar la vista al eliminar
            setError("");
            alert("Usuario eliminado correctamente.");
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            setError("No se pudo eliminar el usuario. Intenta nuevamente.");
        }
    };

    const showAlumnos = () => {
        setView("alumnos");
        setSearchResult(null);
        setIsEditing(false);
    };

    const showInstructores = () => {
        setView("instructores");
        setSearchResult(null);
        setIsEditing(false);
    };

    return (
        <div className="gestion-usuarios-container">
            <h2>Gestión de Usuarios</h2>
            <div className="gestion-usuarios-buttons">
                <button className="btn-alumnos" onClick={showAlumnos}>Alumnos</button>
                <button className="btn-instructores" onClick={showInstructores}>Instructores</button>
            </div>
            <div className="gestion-usuarios-search">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Buscar usuario por email..."
                />
                <button onClick={handleSearch} className="btn-buscar">Buscar</button>
            </div>
            {error && <p className="error-text">{error}</p>}

            {isEditing ? (
                <div className="edit-user-form">
                    <h3>Editar {searchResult.type}</h3>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={editedData.nombre || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {searchResult.type === "Alumno" && (
                        <>
                            <div className="form-group">
                                <label>Género</label>
                                <input
                                    type="text"
                                    name="genero"
                                    value={editedData.genero || ""}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Edad</label>
                                <input
                                    type="number"
                                    name="edad"
                                    value={editedData.edad || ""}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Nivel de Educación</label>
                                <input
                                    type="text"
                                    name="nivel_educacion"
                                    value={editedData.nivel_educacion || ""}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </>
                    )}
                    {searchResult.type === "Instructor" && (
                        <>
                            <div className="form-group">
                                <label>Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    name="fecha_nacimiento"
                                    value={editedData.fecha_nacimiento || ""}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Profesión</label>
                                <input
                                    type="text"
                                    name="profesion"
                                    value={editedData.profesion || ""}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Título Profesional</label>
                                <input
                                    type="text"
                                    name="titulo_profesional"
                                    value={editedData.titulo_profesional || ""}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <button className="btn-guardar" onClick={handleSaveEdit}>Guardar</button>
                    <button className="btn-cancelar" onClick={handleCancelEdit}>Cancelar</button>
                </div>
            ) : (
                <>
                    {searchResult ? (
                        <div className="search-result">
                            <h3>{searchResult.type} Encontrado</h3>
                            <p><strong>Nombre:</strong> {searchResult.data.nombre}</p>
                            <p><strong>Email:</strong> {searchResult.data.email}</p>
                            {searchResult.type === "Alumno" && (
                                <>
                                    <p><strong>Género:</strong> {searchResult.data.genero}</p>
                                    <p><strong>Edad:</strong> {searchResult.data.edad}</p>
                                    <p><strong>Nivel de Educación:</strong> {searchResult.data.nivel_educacion}</p>
                                </>
                            )}
                            {searchResult.type === "Instructor" && (
                                <>
                                    <p><strong>Fecha de Nacimiento:</strong> {searchResult.data.fecha_nacimiento}</p>
                                    <p><strong>Profesión:</strong> {searchResult.data.profesion}</p>
                                    <p><strong>Título Profesional:</strong> {searchResult.data.titulo_profesional}</p>
                                </>
                            )}
                            <button className="btn-editar" onClick={handleEdit}>Editar</button>
                            <button className="btn-eliminar" onClick={handleDelete}>Eliminar</button>
                        </div>
                    ) : (
                        <>
                            {view === "alumnos" && <AlumnosAdmin />}
                            {view === "instructores" && <InstructoresAdmin />}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default GestionUsuarios;