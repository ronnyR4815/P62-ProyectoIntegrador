const user = require('../controllers/users.controller');
const sensor = require('../controllers/sensores.controller');
const express = require('express');
const router = express.Router();

/**
 * Rutas usuarios
 */
router.get('/users', user.getUsuarios);
router.post('/user', user.createUser);
router.put('/user/:id', user.editUser);
router.post('/login', user.getUserByEmailAndPassword);
router.post('/logout', user.logoutUser);
/**
 * Rutas sensores
 */
router.post('/new-dato',sensor.newRegistro);
router.get('/datos',sensor.getDatos);

module.exports = router;