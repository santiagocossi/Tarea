import React, { useState } from 'react';
import api from '../utils/api';

const TareaForm = ({ proyectoId }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/proyectos/${proyectoId}/tareas`, { titulo, descripcion });
            // Manejar éxito (ej. refrescar la lista de tareas)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                placeholder="Título de la Tarea" 
                required 
            />
            <input 
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
                placeholder="Descripción" 
            />
            <button type="submit">Crear Tarea</button>
        </form>
    );
};

export default TareaForm;