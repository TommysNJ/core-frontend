import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Inicio from './componentes/credenciales/Inicio';
import RegistroAlumno from './componentes/credenciales/RegistroAlumno';
import Login from './componentes/credenciales/Login';
import AlumnoPage from './componentes/alumno/AlumnoPage';
import InstructorPage from './componentes/instructor/InstructorPage';
import AdminPage from './componentes/administrador/AdminPage';

const RutaProtegida = ({ children, rolRequerido }) => {
    const token = localStorage.getItem('token');
    const rol = parseInt(localStorage.getItem('rol'));

    // Verificar si el usuario tiene el rol necesario
    if (!token) {
        return <Navigate to="/login" />;
    }

    if (rol !== rolRequerido) {
        return <Navigate to="/" />;
    }

    return children;
};

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/register" element={<RegistroAlumno />} />
                    <Route path="/login" element={<Login />} />
                    
                    {/* Rutas protegidas según el rol */}
                    <Route path="/alumno/*" element={<RutaProtegida rolRequerido={1}><AlumnoPage /></RutaProtegida>} />
                    {/*<Route path="/alumno/info" element={<RutaProtegida rolRequerido={1}><AlumnoInfo /></RutaProtegida>} />*/}
                    <Route path="/instructor/*" element={<RutaProtegida rolRequerido={2}><InstructorPage /></RutaProtegida>} />
                    <Route path="/administrador/*" element={<RutaProtegida rolRequerido={3}><AdminPage /></RutaProtegida>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;