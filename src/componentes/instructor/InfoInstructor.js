import axios from "axios";
import { useEffect, useState } from "react";

const URI = 'https://backend-core-proyecto.onrender.com/instructores';

const InfoInstructor = () => {
    const [instructor, setInstructor] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [profesion, setProfesion] = useState('');
    const [tituloProfesional, setTituloProfesional] = useState('');

    useEffect(() => {
        const fetchInstructorInfo = async () => {
            const email = localStorage.getItem('email');
            const token = localStorage.getItem('token');

            try {
                const res = await axios.get(`${URI}/${email}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setInstructor(res.data);
                setNombre(res.data.nombre);
                setFechaNacimiento(res.data.fecha_nacimiento);
                setProfesion(res.data.profesion);
                setTituloProfesional(res.data.titulo_profesional);
            } catch (error) {
                console.error("Error al obtener la información del instructor:", error);
                setError("No se pudo obtener la información del instructor.");
            }
        };

        fetchInstructorInfo();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        try {
            await axios.put(`${URI}/${email}`, {
                nombre,
                fecha_nacimiento: fechaNacimiento,
                profesion,
                titulo_profesional: tituloProfesional,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setIsEditing(false);
            setInstructor({ nombre, fecha_nacimiento: fechaNacimiento, profesion, titulo_profesional: tituloProfesional });
        } catch (error) {
            console.error("Error al actualizar la información:", error);
            setError("No se pudo actualizar la información. Intenta nuevamente.");
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Información del Instructor</h2>
            {isEditing ? (
                <div>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Fecha de Nacimiento:</label>
                        <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Profesión:</label>
                        <input type="text" value={profesion} onChange={(e) => setProfesion(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Título Profesional:</label>
                        <input type="text" value={tituloProfesional} onChange={(e) => setTituloProfesional(e.target.value)} required />
                    </div>
                    <button onClick={handleSave} className="btn-guardar">Guardar</button>
                    <button onClick={handleCancel} className="btn-cancelar">Cancelar</button>
                </div>
            ) : (
                instructor ? (
                    <div>
                        <p><strong>Nombre:</strong> {instructor.nombre}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {instructor.fecha_nacimiento}</p>
                        <p><strong>Profesión:</strong> {instructor.profesion}</p>
                        <p><strong>Título Profesional:</strong> {instructor.titulo_profesional}</p>
                        <button onClick={handleEdit} className="btn-editar">Editar</button>
                    </div>
                ) : (
                    <p>Cargando información del instructor...</p>
                )
            )}
        </div>
    );
};

export default InfoInstructor;