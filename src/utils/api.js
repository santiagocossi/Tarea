import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Asegúrate de que esto sea correcto
});

// Interceptor para agregar el token JWT a las solicitudes protegidas
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        console.error('Error en la respuesta:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Ocurrió un error'}`);
    } else if (error.request) {
        console.error('Error en la solicitud:', error.request);
        alert('Error: No se pudo conectar al servidor.');
    } else {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    }
    
    return Promise.reject(error);
});

export default api;