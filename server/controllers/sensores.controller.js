const express = require('express');
const router = express.Router();

const Sensor = require('../models/sensores');

const sensorController = {};

router.get('/', (req, res) => {
    res.json({ status: 'API works' });
})

sensorController.newRegistro = async (req, res) => {
    const se = new Sensor({
        dhtTemp: req.body.dhtTemp,
        dhtHum: req.body.dhtHum,
        hwHum: req.body.hwHum
    });
    console.log(se);
    await se.save();
    res.json({ status: 'Nuevo Registro agregado', sensor: se });
}
sensorController.getDatos = async (req, res) => {
    try {
        // Consulta todos los registros de la colección de sensores
        const datos = await Sensor.find();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos de los sensores' });
    }
}

module.exports = sensorController;