// modulos necesarios
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Esquema de logs
const LogsSchema = new Schema({
  application_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Aplication' },
  type: { type: String, enum: ['error', 'info', 'warning'], required: true },
  priority: { type: String, enum: ['lowest', 'low', 'medium', 'high', 'highest'], required: true },
  path: { type: String, required: true },
  message: { type: String, required: true },
  request: { data: {type: mongoose.Schema.Types.Mixed}, created_at: { type: Date, default: Date.now }},
  response: { data: {type: mongoose.Schema.Types.Mixed}, created_at: { type: Date, default: Date.now } },
});

// creamos y exportamos el modelo de logs
const Logs = mongoose.model('Logs', LogsSchema)
module.exports = Logs;