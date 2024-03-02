import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Create a user
// POST /api/users/signup
// Public
router.post('/signup', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: 'User already registered.' });
    }

    console.log('request', req.body);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    try {
        await user.save();

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res
            .status(201)
            .header('Authorization', token)
            .json({ 
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                }, 
                token
            });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong: ' + err.message });
    }
});

// Login a user
// POST /api/users/login
// Public
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.'});
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid email or password.'});
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.header('Authorization', token).json({ user, token });
});

// Get User by id
// GET /api/users/:id
// Public
router.get('/:id', async (req, res) => {
    console.log('id', req.params.id)

    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;