import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const TareaList = ({ proyectoId }) => {
    const [tareas, setTareas] = useState([]);

    const fetchTareas = async () => {
        try {
            const response = await api.get(`/proyectos/${proyectoId}/tareas`);
            setTareas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTareas();
    }, [proyectoId]);

    return (
        <div>
            <h3>Tareas</h3>
            <ul>
                {tareas.map(tarea => (
                    <li key={tarea._id}>{tarea.titulo}</li>
                ))}
            </ul>
        </div>
    );
};

export default TareaList;