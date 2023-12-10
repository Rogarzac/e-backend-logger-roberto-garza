// modulos necesarios
const mongoose = require('mongoose');


//Esquema para aplication
const Schema = mongoose.Schema;
const AplicationSchema = new Schema({
name: { type: String, required: true },
created_at: { type: Date, default: Date.now },
updated_at: { type: Date, default: Date.now }
});

// creamos y exportamos el modelo de Aplication
 const application = mongoose.model('Aplication', AplicationSchema)

 module.exports = application;