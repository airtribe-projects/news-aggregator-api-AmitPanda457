const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'news-aggregator-api-secret';

const formatUserResponse = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    preferences: user.preferences
});

const registerUser = async (req, res) => {
    const { name, email, password, preferences = [] } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (userModel.findUserByEmail(email)) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = userModel.createUser({
        name,
        email,
        password: hashedPassword,
        preferences
    });

    return res.status(200).json({
        message: 'User registered successfully',
        user: formatUserResponse(user)
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = userModel.findUserByEmail(email);

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        jwtSecret,
        { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
};

module.exports = {
    loginUser,
    registerUser
};
