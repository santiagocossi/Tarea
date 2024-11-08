const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    nombre: { type: String, required: true },
    descripcion: { type: String },
    fechaInicio: { type: Date },
    fechaFin: { type: Date }
});

module.exports = mongoose.model('Proyecto', proyectoSchema);