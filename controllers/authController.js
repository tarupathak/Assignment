const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;
        const user = new User({ username, email, password, roles });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
