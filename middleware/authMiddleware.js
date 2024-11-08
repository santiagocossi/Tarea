const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Token inválido o no proporcionado' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'tu_secreto_aqui', (err, user) => {
        if (err) return res.status(403).json({ message: 'Token no válido' });
        
        req.user = user;
        next();
    });
};

module.exports = authMiddleware;