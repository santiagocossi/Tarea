const express = require('express');
const Proyecto = require('../modelos/Proyecto');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Crear un nuevo proyecto (protegido)
router.post('/', authMiddleware, async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const nuevoProyecto = new Proyecto({
            usuario: req.user.id,
            nombre,
            descripcion,
        });
        await nuevoProyecto.save();
        res.status(201).json(nuevoProyecto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar proyectos del usuario autenticado (protegido)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ usuario: req.user.id });
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Actualizar un proyecto (protegido)
router.put('/:id', authMiddleware, async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const proyectoActualizado = await Proyecto.findByIdAndUpdate(req.params.id, 
            { nombre, descripcion }, 
            { new: true }
        );
        if (!proyectoActualizado) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.json(proyectoActualizado);
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Eliminar un proyecto (protegido)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const proyectoEliminado = await Proyecto.findByIdAndDelete(req.params.id);
        if (!proyectoEliminado) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.json({ message: 'Proyecto eliminado' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;