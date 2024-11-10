import React, { useState } from "react";
import axios from "axios";

const USER_URI = "https://backend-core-proyecto.onrender.com/auth/register";

const CrearInstructor = ({ onCancel, onRefresh }) => {
    const [instructor, setInstructor] = useState({
        email: "",
        password: "",
        nombre: "",
        fecha_nacimiento: "",
        profesion: "",
        titulo_profesional: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInstructor({ ...instructor, [name]: value });
    };

    const handleSave = async () => {
        const { email, password, nombre, fecha_nacimiento, profesion, titulo_profesional } = instructor;
        
        try {
            await axios.post(USER_URI, {
                email,
                password,
                role_id: 2, // Rol de Instructor
                nombre,
                fecha_nacimiento,
                profesion,
                titulo_profesional
            });
            onRefresh(); // Refresca el listado de instructores
            onCancel(); // Navega de regreso al listado de instructores
        } catch (error) {
            console.error("Error al crear el instructor:", error);
            setError("No se pudo crear el instructor. Intenta nuevamente.");
        }
    };

    return (
        <div className="crear-instructor-container">
            <h2>Crear Nuevo Instructor</h2>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={instructor.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={instructor.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={instructor.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Fecha de Nacimiento</label>
                <input
                    type="date"
                    name="fecha_nacimiento"
                    value={instructor.fecha_nacimiento}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Profesión</label>
                <input
                    type="text"
                    name="profesion"
                    value={instructor.profesion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Título Profesional</label>
                <input
                    type="text"
                    name="titulo_profesional"
                    value={instructor.titulo_profesional}
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

export default CrearInstructor;