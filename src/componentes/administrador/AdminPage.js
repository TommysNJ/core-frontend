import { Link, Route, Routes } from 'react-router-dom';
import Logout from '../credenciales/Logout';
import GestionUsuarios from './GestionUsuarios';
import GestionCursos from './GestiónCursos';
import GestionTemas from './GestionTemas';
import Reportes from './Reportes';

const AdminPage = () => {
    return (
        <div className="layout">
            <Logout />
            <aside className="sidebar">
                <h2>Administrador</h2>
                <Link to="/administrador/usuarios" className="btn btn-sidebar">Gestión Usuarios</Link>
                <Link to="/administrador/cursos" className="btn btn-sidebar">Gestión Cursos</Link>
                <Link to="/administrador/temas" className="btn btn-sidebar">Gestión Temas</Link>
                <Link to="/administrador/reportes" className="btn btn-sidebar">Reportes</Link>
            </aside>
            <main className="main-content">
                <h1>Bienvenido, Administrador</h1>
                <Routes>
                    <Route path="usuarios" element={<GestionUsuarios />} />
                    {/* Aquí se agregarán otras rutas de administrador */}
                    <Route path="cursos" element={<GestionCursos />} />
                    <Route path="temas" element={<GestionTemas />} />
                    <Route path="reportes" element={<Reportes />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminPage;