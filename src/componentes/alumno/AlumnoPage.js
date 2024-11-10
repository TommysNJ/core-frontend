import { Link, Route, Routes } from 'react-router-dom';
import Logout from '../credenciales/Logout';
import InfoAlumno from './InfoAlumno';
import Inscripciones from './Inscripciones';

const AlumnoPage = () => {
    return (
        <div className="layout">
            <Logout/>
            <aside className="sidebar">
                <h2>Alumno</h2>
                <Link to="/alumno/info" className="btn btn-sidebar">Información Alumno</Link>
                <Link to="/alumno/inscripciones" className="btn btn-sidebar">Inscripciones</Link>
            </aside>
            <main className="main-content">
                <h1>Bienvenido, Alumno</h1>
                <Routes>
                    <Route path="info" element={<InfoAlumno />} />
                    <Route path="inscripciones" element={<Inscripciones />} />
                    {/* Aquí puedes agregar otras rutas para inscripciones u otras funciones de alumno */}
                </Routes>
            </main>
        </div>
    );
};

export default AlumnoPage;