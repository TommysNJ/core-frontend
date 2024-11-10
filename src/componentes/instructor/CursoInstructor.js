// CursosInstructor.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const URI_CURSOS = 'https://backend-core-proyecto.onrender.com/cursos';
const URI_ALUMNOS = 'https://backend-core-proyecto.onrender.com/cursos/students';
const URI_PROGRESO = 'https://backend-core-proyecto.onrender.com/progresos';

const CursosInstructor = () => {
    const [cursos, setCursos] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [progresos, setProgresos] = useState([]);
    const [selectedCursoId, setSelectedCursoId] = useState(null);
    const [selectedAlumnoId, setSelectedAlumnoId] = useState(null);
    const [view, setView] = useState('cursos'); // 'cursos', 'alumnos', 'progreso'

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const emailInstructor = localStorage.getItem("email");
                const res = await axios.get(`${URI_CURSOS}/instructor/${emailInstructor}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setCursos(res.data);
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
            }
        };

        fetchCursos();
    }, []);

    const handleVerAlumnos = async (cursoId) => {
        setSelectedCursoId(cursoId);
        setView('alumnos');
        try {
            const res = await axios.get(`${URI_ALUMNOS}/${cursoId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setAlumnos(res.data);
        } catch (error) {
            console.error("Error al obtener los alumnos:", error);
        }
    };

    const handleVerProgreso = async (idInscripcion) => {
        setSelectedAlumnoId(idInscripcion);
        setView('progreso');
        try {
            const res = await axios.get(`${URI_PROGRESO}/${idInscripcion}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setProgresos(res.data);
        } catch (error) {
            console.error("Error al obtener el progreso:", error);
        }
    };

    const handleRegresarAlumnos = () => {
        setView('alumnos');
        setSelectedAlumnoId(null);
    };

    const handleRegresarCursos = () => {
        setView('cursos');
        setSelectedCursoId(null);
        setSelectedAlumnoId(null);
    };

    return (
        <div className="cursos-instructor-container">
            {view === 'cursos' && (
                <>
                    <h2>Tus Cursos</h2>
                    {cursos.length > 0 ? (
                        cursos.map((curso) => (
                            <div key={curso.id_curso} className="curso-item">
                                <h3>{curso.nombre}</h3>
                                <p>{curso.descripcion}</p>
                                <button onClick={() => handleVerAlumnos(curso.id_curso)} className="btn-ver-alumnos">
                                    Ver Alumnos
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No tienes cursos asignados.</p>
                    )}
                </>
            )}

            {view === 'alumnos' && (
                <>
                    <button onClick={handleRegresarCursos} className="btn-regresar">Regresar</button>
                    <h2>Alumnos Inscritos</h2>
                    {alumnos.length > 0 ? (
                        alumnos.map((alumno) => (
                            <div key={alumno.id_inscripcion} className="alumno-item">
                                <p><strong>Nombre:</strong> {alumno.alumno?.nombre || "Nombre no disponible"}</p>
                                <p><strong>Email:</strong> {alumno.alumno?.email || "Email no disponible"}</p>
                                <p><strong>Fecha de inscripción:</strong> {alumno.fecha_inscripcion}</p>
                                <button onClick={() => handleVerProgreso(alumno.id_inscripcion)} className="btn-ver-progreso">
                                    Ver Progreso
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No hay alumnos inscritos en este curso.</p>
                    )}
                </>
            )}

            {view === 'progreso' && (
                <>
                    <button onClick={handleRegresarAlumnos} className="btn-regresar">Regresar</button>
                    <h2>Progreso del Alumno</h2>
                    {progresos.length > 0 ? (
                        progresos.map((progreso) => (
                            <div key={progreso.id_detalle} className="progreso-item">
                                <p><strong>Fecha de actualización:</strong> {progreso.fecha_actualizacion}</p>
                                <p><strong>Descripción:</strong> {progreso.descripcion}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay registros de progreso para este alumno.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default CursosInstructor;