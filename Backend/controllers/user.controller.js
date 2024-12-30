const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { usersModel } from '../models/user.models.js';

const registerUser = async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await usersModel(email, hashedPassword, rol, lenguage);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'el usuario no existe' });
        }

        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

const getUser = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await usersModel(email);
        res.json(user);
    } catch (error) {
        es.status(500).json(error);
    }
};

export const usersController = {
    registerUser,
    loginUser,
    getUser,
  };