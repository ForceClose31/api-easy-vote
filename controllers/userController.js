const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const login = async (req, res) => {
    const { nim, password } = req.body;

    if (!nim || !password) {
        return res.status(400).json({ error: 'NIM and password are required' });
    }

    try {
        const user = await User.findOne({ where: { nim } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, nim: user.nim }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, nim: user.nim, name: user.name },
        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { login };
