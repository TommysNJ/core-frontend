import React, { useState } from "react";
import axios from "axios";

const USER_URI = "https://backend-core-proyecto.onrender.com/auth/register";

const CrearAlumno = ({ onCancel, onRefresh }) => {
    const [alumno, setAlumno] = useState({
        email: "",
        password: "",
        nombre: "",
        genero: "",
        edad: "",
        nivel_educacion: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlumno({ ...alumno, [name]: value });
    };

    const handleGeneroChange = (e) => {
        setAlumno({ ...alumno, genero: e.target.value });
    };

    const handleSave = async () => {
        const { email, password, nombre, genero, edad, nivel_educacion } = alumno;
        
        try {
            await axios.post(USER_URI, {
                email,
                password,
                role_id: 1, // Rol de Alumno
                nombre,
                genero,
                edad,
                nivel_educacion
            });
            onRefresh(); // Refresca el listado de alumnos
            onCancel(); // Navega de regreso al listado de alumnos
        } catch (error) {
            console.error("Error al crear el alumno:", error);
            setError("No se pudo crear el alumno. Intenta nuevamente.");
        }
    };

    return (
        <div className="crear-alumno-container">
            <h2>Crear Nuevo Alumno</h2>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={alumno.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={alumno.password}
                    onChange={handleChange}
                    required
                />
            </div>
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

export default CrearAlumno;