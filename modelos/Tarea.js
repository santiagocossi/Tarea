const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    proyecto: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto' },
    titulo: { type: String, required: true },
    descripcion: { type: String },
    estado: { type: String, enum: ['pendiente', 'en progreso', 'completada'] },
    prioridad: { type: Number, min: 1, max: 5 }
});

module.exports = mongoose.model('Tarea', tareaSchema);