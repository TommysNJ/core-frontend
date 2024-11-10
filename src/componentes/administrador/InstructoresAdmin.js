import React, { useState, useEffect } from "react";
import axios from "axios";
import CrearInstructor from "./CrearInstructor";
import EditarInstructor from "./EditarInstructor";

const URI_INSTRUCTORES = "https://backend-core-proyecto.onrender.com/instructores";
const URI_USERS = "https://backend-core-proyecto.onrender.com/auth/delete";

const InstructoresAdmin = () => {
    const [instructores, setInstructores] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [editingInstructorId, setEditingInstructorId] = useState(null);

    useEffect(() => {
        fetchInstructores();
    }, []);

    const fetchInstructores = async () => {
        try {
            const res = await axios.get(URI_INSTRUCTORES, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setInstructores(res.data);
        } catch (error) {
            console.error("Error al obtener los instructores:", error);
        }
    };

    const handleCreate = () => {
        setIsCreating(true);
        setEditingInstructorId(null);
    };

    const handleEdit = (email) => {
        setEditingInstructorId(email);
        setIsCreating(false);
    };

    const handleCancel = () => {
        setIsCreating(false);
        setEditingInstructorId(null);
    };

    const handleDelete = async (email) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este instructor?");
        if (confirmDelete) {
            try {
                await axios.delete(`${URI_USERS}/${email}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                fetchInstructores(); // Refrescar lista después de eliminar
            } catch (error) {
                console.error("Error al eliminar el instructor:", error);
            }
        }
    };

    return (
        <div className="instructores-admin-container">
            <h2>Instructores</h2>
            {isCreating ? (
                <CrearInstructor onCancel={handleCancel} onRefresh={fetchInstructores} />
            ) : editingInstructorId ? (
                <EditarInstructor instructorId={editingInstructorId} onCancel={handleCancel} onRefresh={fetchInstructores} />
            ) : (
                <>
                    <button className="btn-crear-instructor" onClick={handleCreate}>Crear Instructor</button>
                    <div className="instructores-list">
                        {instructores.map((instructor) => (
                            <div key={instructor.email} className="instructor-item">
                                <p><strong>Email:</strong> {instructor.email}</p>
                                <p><strong>Nombre:</strong> {instructor.nombre}</p>
                                <p><strong>Profesión:</strong> {instructor.profesion}</p>
                                <p><strong>Título Profesional:</strong> {instructor.titulo_profesional}</p>
                                <button className="btn-editar" onClick={() => handleEdit(instructor.email)}>Editar</button>
                                <button className="btn-eliminar" onClick={() => handleDelete(instructor.email)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default InstructoresAdmin;