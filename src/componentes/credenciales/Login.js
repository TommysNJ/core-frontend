import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URI = 'https://backend-core-proyecto.onrender.com/auth/login';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(URI, { email, password });

            if (res.status === 200 && res.data.token) {
                // Guardar token y rol en localStorage
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('rol', res.data.rolInfo); 
                localStorage.setItem('email', res.data.userInfo.email);

                // Redirigir según el rol
                const rol = res.data.rolInfo;
                if (rol === 1) {
                    navigate('/alumno');
                } else if (rol === 2) {
                    navigate('/instructor');
                } else if (rol === 3) {
                    navigate('/administrador');
                }
            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión, credenciales inválidas.');
        }
    };

    return (
        <div className="login-container">
            <h3>Iniciar Sesión</h3>
            <form onSubmit={handleLogin}>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="btn btn-log">Iniciar Sesión</button>
            </form>
            <div className='mt-3'>
                <p>¿No tienes cuenta?</p>
                <Link to="/register" className="btn btn-secondary">Registrarse</Link>
            </div>
        </div>
    );
};

export default Login;