import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = 'https://backend-core-proyecto.onrender.com/auth/register';

const RegistroAlumno = () => {
    const [alumno, setAlumno] = useState({
        email: '',
        password: '',
        nombre: '',
        genero: '',
        edad: '',
        nivel_educacion: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlumno({ ...alumno, [name]: value });
    };

    const handleGeneroChange = (e) => {
        setAlumno({ ...alumno, genero: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(URI, { ...alumno, role_id: 1 });
            alert("Registro exitoso");
            navigate("/");
        } catch (error) {
            console.error("Error al registrar el alumno:", error);
            setError("Error al registrar el alumno. Por favor, intenta nuevamente.");
        }
    };

    return (
        <div className="registro-container">
            <h2>Registro de Alumno</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={alumno.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" name="password" value={alumno.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" name="nombre" value={alumno.nombre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Género</label>
                    <div>
                        <label>
                            <input type="radio" value="Masculino" checked={alumno.genero === "Masculino"} onChange={handleGeneroChange} required />
                            Masculino
                        </label>
                        <label>
                            <input type="radio" value="Femenino" checked={alumno.genero === "Femenino"} onChange={handleGeneroChange} />
                            Femenino
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Edad</label>
                    <input type="number" name="edad" value={alumno.edad} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Nivel de Educación</label>
                    <input type="text" name="nivel_educacion" value={alumno.nivel_educacion} onChange={handleChange} required />
                </div>
                {error && <p className="error-text">{error}</p>}
                <button type="submit" className="btn btn-registrarse">Registrarse</button>
            </form>
        </div>
    );
};

export default RegistroAlumno;