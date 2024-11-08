const express = require('express');
const Usuario = require('../modelos/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const nuevoUsuario = new Usuario({ nombre, email, password });
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario creado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario || !await bcrypt.compare(password, usuario.password)) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;