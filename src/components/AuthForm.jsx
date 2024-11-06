import React, { useState } from 'react';
import api from '../utils/api';

const AuthForm = ({ isLogin }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = isLogin 
                ? await api.post('/auth/login', { email, password }) 
                : await api.post('/auth/register', { nombre, email, password });
            
            localStorage.setItem('token', response.data.token);
            // Redirigir o actualizar estado según sea necesario
        } catch (error) {
            console.error(error);
            // Manejar errores (ej. mostrar mensaje)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {!isLogin && (
                <input 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    placeholder="Nombre" 
                    required 
                />
            )}
            <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required 
            />
            <input 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Contraseña" 
                type="password" 
                required 
            />
            <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrar'}</button>
        </form>
    );
};

export default AuthForm;