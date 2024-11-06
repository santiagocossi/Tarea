import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';

const ProyectoForm = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    // Cargar datos del proyecto si estamos editando
    useEffect(() => {
        const fetchProyecto = async () => {
            if (id) {
                const response = await api.get(`/proyectos/${id}`);
                setNombre(response.data.nombre);
                setDescripcion(response.data.descripcion);
            }
        };
        fetchProyecto();
    }, [id]);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await api.put(`/proyectos/${id}`, { nombre, descripcion });
            } else {
                await api.post('/proyectos', { nombre, descripcion });
            }
            navigate('/proyectos'); // Redirigir a la lista de proyectos después de guardar
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Nombre del Proyecto" 
                required 
            />
            <textarea 
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
                placeholder="Descripción" 
            />
            <button type="submit">{id ? 'Actualizar Proyecto' : 'Crear Proyecto'}</button>
        </form>
    );
};

export default ProyectoForm;