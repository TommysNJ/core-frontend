import { Link } from "react-router-dom";

const Inicio = () => {
    return (
        <div className="inicio-container">
            <h1>Bienvenido</h1>
            <div className="botones-inicio">
                <Link to="/login" className="btn btn-iniciar">Iniciar Sesión</Link>
                <Link to="/register" className="btn btn-registrarse">Registrarse</Link>
            </div>
        </div>
    );
};

export default Inicio;