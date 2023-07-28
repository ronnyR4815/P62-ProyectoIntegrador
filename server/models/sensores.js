const mongoose = require('mongoose');
const { Schema } = mongoose;

const SensoresSchema = new Schema({
    dhtTemp: { type: String },
    dhtHum: { type: String },
    hwHum: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('sensor', SensoresSchema);