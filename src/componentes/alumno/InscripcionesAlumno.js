import React, { useEffect, useState } from "react";
import axios from "axios";
import CalificacionView from "./CalificacionView";
import ProgresoView from "./ProgresoView";

const URI = 'https://backend-core-proyecto.onrender.com/inscripciones';

const InscripcionesAlumno = () => {
    const [inscripciones, setInscripciones] = useState([]);
    const [selectedInscripcionId, setSelectedInscripcionId] = useState(null);
    const [view, setView] = useState('inscripciones'); // 'inscripciones', 'calificacion', 'progreso'
    const emailAlumno = localStorage.getItem("email");

    useEffect(() => {
        const fetchInscripciones = async () => {
            try {
                const res = await axios.get(`${URI}/${emailAlumno}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setInscripciones(res.data);
            } catch (error) {
                console.error("Error al obtener las inscripciones:", error);
            }
        };

        fetchInscripciones();
    }, [emailAlumno]);

    const handleCalificar = (id) => {
        setSelectedInscripcionId(id);
        setView('calificacion');
    };

    const handleProgreso = (id) => {
        setSelectedInscripcionId(id);
        setView('progreso');
    };

    const handleBack = () => {
        setView('inscripciones');
        setSelectedInscripcionId(null);
    };

    return (
        <div className="inscripciones-alumno-container">
            {view === 'inscripciones' && (
                <>
                    <h2>Tus Inscripciones</h2>
                    {inscripciones.length > 0 ? (
                        inscripciones.map((inscripcion) => (
                            <div key={inscripcion.id_inscripcion} className="inscripcion-item">
                                <h3>Curso: {inscripcion.curso?.nombre || "Nombre no disponible"}</h3>
                                <p>Descripción del curso: {inscripcion.curso?.descripcion || "Descripción no disponible"}</p>
                                <p>Instructor: {inscripcion.curso?.instructor?.nombre || "Instructor no disponible"}</p>
                                <p>Email del instructor: {inscripcion.curso?.instructor?.email || "Email no disponible"}</p>
                                <p>Fecha de inscripción: {inscripcion.fecha_inscripcion}</p>
                                <button className="btn-calificar" onClick={() => handleCalificar(inscripcion.id_inscripcion)}>Calificar</button>
                                <button className="btn-progreso" onClick={() => handleProgreso(inscripcion.id_inscripcion)}>Reporte Progreso</button>
                            </div>
                        ))
                    ) : (
                        <p>No tienes inscripciones.</p>
                    )}
                </>
            )}
            {view === 'calificacion' && (
                <CalificacionView idInscripcion={selectedInscripcionId} onBack={handleBack} />
            )}
            {view === 'progreso' && (
                <ProgresoView idInscripcion={selectedInscripcionId} onBack={handleBack} />
            )}
        </div>
    );
};

export default InscripcionesAlumno;