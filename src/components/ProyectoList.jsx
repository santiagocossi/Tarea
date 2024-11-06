import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const ProyectoList = () => {
    const [proyectos, setProyectos] = useState([]);
    const navigate = useNavigate();

    const fetchProyectos = async () => {
        try {
            const response = await api.get('/proyectos');
            setProyectos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Función para eliminar un proyecto
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
            try {
                await api.delete(`/proyectos/${id}`);
                fetchProyectos(); // Refrescar la lista después de eliminar
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Función para editar un proyecto
    const handleEdit = (id) => {
        navigate(`/proyectos/${id}/editar`); // Redirigir a la página de edición
    };

    useEffect(() => {
        fetchProyectos();
    }, []);

    return (
        <div>
            <h2>Proyectos</h2>
            <ul>
                {proyectos.map(proyecto => (
                    <li key={proyecto._id}>
                        {proyecto.nombre}
                        <button onClick={() => handleEdit(proyecto._id)}>Editar</button>
                        <button onClick={() => handleDelete(proyecto._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProyectoList;