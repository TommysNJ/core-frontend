// componentes/administrador/gestionCursos/ListadoCursos.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const URI = 'https://backend-core-proyecto.onrender.com/cursos';

const ListadoCursos = ({ cursos, onEdit, onCancel }) => {
    const [allCursos, setAllCursos] = useState([]);

    useEffect(() => {
        if (cursos) {
            setAllCursos(cursos); // Muestra resultados de búsqueda si están presentes
        } else {
            const fetchCursos = async () => {
                try {
                    const res = await axios.get(URI, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    setAllCursos(res.data);
                } catch (error) {
                    console.error("Error al obtener los cursos:", error);
                }
            };
            fetchCursos();
        }
    }, [cursos]);

    const handleEliminarClick = async (id_curso) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este curso?");
        
        if (confirmDelete) {
            try {
                await axios.delete(`${URI}/${id_curso}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                // Refresca el listado eliminando el curso del estado actual
                setAllCursos(allCursos.filter(curso => curso.id_curso !== id_curso));
            } catch (error) {
                console.error("Error al eliminar el curso:", error);
            }
        }
    };

    return (
        <div>
            <h3>Listado de Cursos</h3>
            {cursos && <button onClick={onCancel} className="btn-cancelar">Cancelar búsqueda</button>}
            {allCursos.length > 0 ? (
                allCursos.map((curso) => (
                    <div key={curso.id_curso} className="curso-item">
                        <h4>{curso.nombre}</h4>
                        <p>Descripción: {curso.descripcion}</p>
                        <p>Instructor: {curso.instructor?.nombre || "No disponible"}</p>
                        <p>Email: {curso.instructor?.email || "No disponible"}</p>
                        <p>Tema: {curso.tema?.tipo || "No disponible"}</p>
                        <p>Subtemática: {curso.subtematica?.tipo || "No disponible"}</p>
                        <button onClick={() => onEdit(curso.id_curso)} className="btn-editar">Editar</button>
                        <button onClick={() => handleEliminarClick(curso.id_curso)} className="btn-eliminar">Eliminar</button>
                    </div>
                ))
            ) : (
                <p>No se encontraron cursos.</p>
            )}
        </div>
    );
};

export default ListadoCursos;