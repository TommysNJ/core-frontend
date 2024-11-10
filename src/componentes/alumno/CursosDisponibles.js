import axios from "axios";
import { useEffect, useState } from "react";

const URI_CURSOS = 'https://backend-core-proyecto.onrender.com/cursos';
const URI_INSCRIPCIONES = 'https://backend-core-proyecto.onrender.com/inscripciones';

const CursosDisponibles = () => {
    const [cursos, setCursos] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCursos = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(URI_CURSOS, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setCursos(res.data);
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
            }
        };

        fetchCursos();
    }, []);

    const handleInscribirse = async (id_curso) => {
        const email_alumno = localStorage.getItem('email');
        const token = localStorage.getItem('token');

        try {
            const res = await axios.post(URI_INSCRIPCIONES, { email_alumno, id_curso }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setMensaje(res.data.message);
            setError("");
        } catch (error) {
            console.error("Error al inscribirse en el curso:", error);
            setMensaje("");
            setError("Ya estás inscrito en este curso. Selecciona otro.");
        }
    };

    return (
        <div className="cursos-container">
            <h2>Cursos Disponibles</h2>
            {mensaje && <p className="mensaje">{mensaje}</p>}
            {error && <p className="error-mensaje">{error}</p>}
            {cursos.length > 0 ? (
                cursos.map((curso) => (
                    <div key={curso.id_curso} className="curso-item">
                        <p><strong>Nombre:</strong> {curso.nombre}</p>
                        <p><strong>Descripción:</strong> {curso.descripcion}</p>
                        <button onClick={() => handleInscribirse(curso.id_curso)} className="btn-inscribirse">Inscribirse</button>
                    </div>
                ))
            ) : (
                <p>No hay cursos disponibles en este momento.</p>
            )}
        </div>
    );
};

export default CursosDisponibles;