import { useState } from "react";
import CursosDisponibles from "./CursosDisponibles";
import InscripcionesAlumno from "./InscripcionesAlumno";

const Inscripciones = () => {
    const [mostrarCursos, setMostrarCursos] = useState(false);
    const [mostrarInscripciones, setMostrarInscripciones] = useState(false);

    const handleMostrarCursos = () => {
        setMostrarCursos(true);
        setMostrarInscripciones(false);
    };

    const handleMostrarInscripciones = () => {
        setMostrarInscripciones(true);
        setMostrarCursos(false);
    };


    return (
        <div>
            <h2>Inscripciones</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <button onClick={handleMostrarCursos} className="btn btn-cursos">Cursos</button>
                <button onClick={handleMostrarInscripciones} className="btn-inscripciones">Inscripciones</button>
            </div>
            {mostrarCursos && <CursosDisponibles />}
            {mostrarInscripciones && <InscripcionesAlumno />}
        </div>
    );
};

export default Inscripciones;