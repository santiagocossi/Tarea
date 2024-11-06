import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Almacena el token
                // Redirigir o realizar otra acción después del inicio de sesión exitoso
                console.log("Inicio de sesión exitoso");
            }
        } catch (err) {
            setError('Credenciales inválidas'); // Manejo de errores
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Contraseña:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default LoginForm;