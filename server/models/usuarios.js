const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuariosSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tipo: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('usuario', UsuariosSchema);
