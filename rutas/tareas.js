const express = require('express');
const Tarea = require('../modelos/Tarea');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Crear una nueva tarea (protegido)
router.post('/proyectos/:proyectoId/tareas', authMiddleware, async (req, res) => {
    const { titulo, descripcion, estado, prioridad } = req.body;
    const { proyectoId } = req.params;

    try {
        const nuevaTarea = new Tarea({
            proyecto: proyectoId,
            titulo,
            descripcion,
            estado,
            prioridad
        });
        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Listar todas las tareas de un proyecto (protegido)
router.get('/proyectos/:proyectoId/tareas', authMiddleware, async (req, res) => {
    const { proyectoId } = req.params;

    try {
        const tareas = await Tarea.find({ proyecto: proyectoId });
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Actualizar una tarea (protegido)
router.put('/tareas/:id', authMiddleware, async (req, res) => {
    const { titulo, descripcion, estado, prioridad } = req.body;

    try {
        const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id,
            { titulo, descripcion, estado, prioridad },
            { new: true }
        );
        if (!tareaActualizada) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(tareaActualizada);
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Eliminar una tarea (protegido)
router.delete('/tareas/:id', authMiddleware, async (req, res) => {
    try {
        const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
        if (!tareaEliminada) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;