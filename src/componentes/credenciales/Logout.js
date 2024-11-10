import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
        localStorage.removeItem('rol'); // Eliminar el rol del almacenamiento local
        localStorage.removeItem('email');
        navigate('/'); // Redirigir a la página de inicio
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
        </button>
    );
};

export default Logout;