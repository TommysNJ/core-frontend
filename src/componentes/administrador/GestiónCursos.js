// componentes/administrador/gestionCursos/GestionCursos.js

import React, { useState } from "react";
import ListadoCursos from "./ListadoCursos";
import CrearCurso from "./CrearCurso";
import EditarCurso from "./EditarCurso";
import axios from "axios";

const URI_CURSOS = "https://backend-core-proyecto.onrender.com/cursos";

const GestionCursos = () => {
    const [view, setView] = useState("list"); // 'list', 'create', 'edit', 'searchResults'
    const [cursoId, setCursoId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const res = await axios.get(`${URI_CURSOS}/instructor/${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setSearchResults(res.data);
            setView("searchResults");
        } catch (error) {
            console.error("Error al buscar cursos del instructor:", error);
        }
    };

    const handleCreate = () => {
        setView("create");
    };

    const handleEdit = (id) => {
        setCursoId(id);
        setView("edit");
    };

    const handleCancel = () => {
        setView("list");
        setSearchResults(null);
        setSearchQuery("");
    };

    const handleRefresh = () => {
        setView("list");
        setSearchResults(null);
    };

    return (
        <div className="gestion-cursos-container">
            <h2>Gestión de Cursos</h2>
            {view === "list" && (
                <>
                    <div className="gestion-cursos-buttons">
                        <button onClick={handleCreate} className="btn-crear-curso">Crear Curso</button>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Buscar curso por email de instructor..."
                        />
                        <button onClick={handleSearch} className="btn-buscar">Buscar</button>
                    </div>
                    <ListadoCursos onEdit={handleEdit} />
                </>
            )}
            {view === "create" && (
                <CrearCurso onCancel={handleCancel} onRefresh={handleRefresh} />
            )}
            {view === "edit" && cursoId && (
                <EditarCurso cursoId={cursoId} onCancel={handleCancel} onRefresh={handleRefresh} />
            )}
            {view === "searchResults" && (
                <ListadoCursos cursos={searchResults} onEdit={handleEdit} onCancel={handleCancel} />
            )}
        </div>
    );
};

export default GestionCursos;