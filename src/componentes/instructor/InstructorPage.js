import { Link, Route, Routes } from 'react-router-dom';
import Logout from '../credenciales/Logout';
import InfoInstructor from './InfoInstructor';
import CursosInstructor from './CursoInstructor';

const InstructorPage = () => {
    return (
        <div className="layout">
            <Logout />
            <aside className="sidebar">
                <h2>Instructor</h2>
                <Link to="/instructor/info" className="btn btn-sidebar">Información Instructor</Link>
                <Link to="/instructor/cursos" className="btn btn-sidebar">Cursos</Link>
                <Link to="/instructor/reportes" className="btn btn-sidebar">Reportes</Link>
            </aside>
            <main className="main-content">
                <h1>Bienvenido, Instructor</h1>
                <Routes>
                    <Route path="info" element={<InfoInstructor />} />
                    <Route path="cursos" element={<CursosInstructor />} />
                </Routes>
            </main>
        </div>
    );
};

export default InstructorPage;