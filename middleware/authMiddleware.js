const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const jwtSecret = process.env.JWT_SECRET || 'news-aggregator-api-secret';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[0] === 'Bearer'
        ? authHeader.split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    try {
        const payload = jwt.verify(token, jwtSecret);
        const user = userModel.findUserByEmail(payload.email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;
