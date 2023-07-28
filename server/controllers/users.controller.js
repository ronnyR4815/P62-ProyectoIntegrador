const express = require('express');
const router = express.Router();

const User = require('../models/usuarios');

const userController = {};

router.get('/', (req, res) => {
    res.json({ status: 'API works' });
})

userController.getUsuarios = async (req, res) => {
    const us = await User.find();
    res.json(us);
    console.log(us);
}
userController.createUser = async (req, res) => {
    const us = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        tipo: req.body.tipo
    });
    console.log(us);
    await us.save();
    res.json({ status: 'Nuevo Usuario registrado', user: us });
}
userController.editUser = async (req, res) => {
    const { id } = req.params;
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        tipo: req.body.tipo
    };
    await User.findByIdAndUpdate(id, { $set: user }, { new: true });
    res.json({ status: 'Usuario actualizado' });
}
userController.getUserByEmailAndPassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el usuario' });
    }
}
userController.logoutUser = async (req, res) => {
    try {
        res.json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cerrar la sesión' });
    }
}

module.exports = userController;