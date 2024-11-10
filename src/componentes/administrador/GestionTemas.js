// componentes/administrador/gestionTemas/GestionTemas.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const TEMAS_URI = "https://backend-core-proyecto.onrender.com/temas";

const GestionTemas = () => {
    const [temas, setTemas] = useState([]);
    const [view, setView] = useState("list"); // 'list', 'create', 'edit'
    const [temaId, setTemaId] = useState(null);
    const [temaData, setTemaData] = useState({ tipo: "", descripcion: "" });
    const [error, setError] = useState("");

    // Función para obtener todos los temas
    const fetchTemas = async () => {
        try {
            const res = await axios.get(TEMAS_URI, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setTemas(res.data);
        } catch (error) {
            console.error("Error al obtener los temas:", error);
            setError("Error al obtener los temas.");
        }
    };

    useEffect(() => {
        fetchTemas();
    }, []);

    // Función para manejar la creación de un nuevo tema
    const handleCreate = () => {
        setTemaData({ tipo: "", descripcion: "" });
        setView("create");
    };

    // Función para manejar la edición de un tema existente
    const handleEdit = (id, tipo, descripcion) => {
        setTemaId(id);
        setTemaData({ tipo, descripcion });
        setView("edit");
    };

    // Función para cancelar la creación o edición y volver al listado
    const handleCancel = () => {
        setView("list");
    };

    // Función para guardar un nuevo tema en la base de datos
    const handleSaveCreate = async () => {
        try {
            await axios.post(TEMAS_URI, temaData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            fetchTemas();
            setView("list");
        } catch (error) {
            console.error("Error al crear el tema:", error);
            setError("No se pudo crear el tema. Intenta nuevamente.");
        }
    };

    // Función para guardar los cambios de un tema existente
    const handleSaveEdit = async () => {
        try {
            await axios.put(`${TEMAS_URI}/${temaId}`, temaData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            fetchTemas();
            setView("list");
        } catch (error) {
            console.error("Error al actualizar el tema:", error);
            setError("No se pudo actualizar el tema. Intenta nuevamente.");
        }
    };

    // Función para manejar la eliminación de un tema
    const handleEliminarClick = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este tema?");
        if (confirmDelete) {
            try {
                await axios.delete(`${TEMAS_URI}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                fetchTemas();
            } catch (error) {
                console.error("Error al eliminar el tema:", error);
                setError("No se pudo eliminar el tema.");
            }
        }
    };

    // Función para manejar el cambio de entrada en los formularios
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTemaData({ ...temaData, [name]: value });
    };

    return (
        <div className="gestion-temas-container">
            <h2>Gestión de Temas</h2>
            {view === "list" && (
                <>
                    <div className="gestion-temas-buttons">
                        <button onClick={handleCreate} className="btn-crear-tema">Crear Tema</button>
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    {temas.length > 0 ? (
                        temas.map((tema) => (
                            <div key={tema.id_tema} className="tema-item">
                                <h4>{tema.tipo}</h4>
                                <p>Descripción: {tema.descripcion}</p>
                                <button onClick={() => handleEdit(tema.id_tema, tema.tipo, tema.descripcion)} className="btn-editar">Editar</button>
                                <button onClick={() => handleEliminarClick(tema.id_tema)} className="btn-eliminar">Eliminar</button>
                            </div>
                        ))
                    ) : (
                        <p>No hay temas disponibles.</p>
                    )}
                </>
            )}

            {view === "create" && (
                <div className="crear-tema-container">
                    <h3>Crear Nuevo Tema</h3>
                    <div className="form-group">
                        <label>Tipo de Tema</label>
                        <input
                            type="text"
                            name="tipo"
                            value={temaData.tipo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            name="descripcion"
                            value={temaData.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button className="btn-guardar" onClick={handleSaveCreate}>Guardar</button>
                    <button className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
                </div>
            )}

            {view === "edit" && (
                <div className="editar-tema-container">
                    <h3>Editar Tema</h3>
                    <div className="form-group">
                        <label>Tipo de Tema</label>
                        <input
                            type="text"
                            name="tipo"
                            value={temaData.tipo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            name="descripcion"
                            value={temaData.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button className="btn-guardar" onClick={handleSaveEdit}>Guardar</button>
                    <button className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default GestionTemas;