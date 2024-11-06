const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./rutas/autenticacion');
const proyectoRoutes = require('./rutas/proyectos');
const tareaRoutes = require('./rutas/tareas');

require('dotenv').config();

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173'}));

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.error("Error al conectar a MongoDB:", err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});