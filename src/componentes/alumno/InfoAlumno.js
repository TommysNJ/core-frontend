import axios from "axios";
import { useEffect, useState } from "react";

const URI = 'https://backend-core-proyecto.onrender.com/alumnos';

const InfoAlumno = () => {
    const [alumno, setAlumno] = useState(null);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Estado para mostrar el formulario de edición
    const [editedAlumno, setEditedAlumno] = useState({
        nombre: '',
        genero: '',
        edad: '',
        nivel_educacion: ''
    });

    useEffect(() => {
        const fetchAlumnoInfo = async () => {
            const email = localStorage.getItem('email');
            const token = localStorage.getItem('token');

            try {
                const res = await axios.get(`${URI}/${email}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAlumno(res.data);
                setEditedAlumno(res.data); // Inicializar datos para edición
            } catch (error) {
                console.error("Error al obtener la información del alumno:", error);
                setError("No se pudo obtener la información del alumno.");
            }
        };

        fetchAlumnoInfo();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedAlumno({ ...editedAlumno, [name]: value });
    };

    const handleSave = async () => {
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');

        try {
            await axios.put(`${URI}/${email}`, editedAlumno, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAlumno(editedAlumno); // Actualizar la vista con los nuevos datos
            setIsEditing(false); // Salir de la edición
        } catch (error) {
            console.error("Error al actualizar la información del alumno:", error);
            setError("No se pudo actualizar la información del alumno.");
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Información del Alumno</h2>
            {isEditing ? (
                <div>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={editedAlumno.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Género:</label>
                        <select
                            name="genero"
                            value={editedAlumno.genero}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Edad:</label>
                        <input
                            type="number"
                            name="edad"
                            value={editedAlumno.edad}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Nivel de Educación:</label>
                        <input
                            type="text"
                            name="nivel_educacion"
                            value={editedAlumno.nivel_educacion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="btn-guardar" onClick={handleSave}>Guardar</button>
                    <button className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
                </div>
            ) : (
                <>
                    {alumno ? (
                        <div>
                            <p><strong>Nombre:</strong> {alumno.nombre}</p>
                            <p><strong>Género:</strong> {alumno.genero}</p>
                            <p><strong>Edad:</strong> {alumno.edad}</p>
                            <p><strong>Nivel de Educación:</strong> {alumno.nivel_educacion}</p>
                            <button className="btn-editar" onClick={handleEdit}>Editar</button>
                        </div>
                    ) : (
                        <p>Cargando información del alumno...</p>
                    )}
                </>
            )}
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default InfoAlumno;