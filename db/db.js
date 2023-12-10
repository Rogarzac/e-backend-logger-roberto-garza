// modulos necesarios
const mongoose = require('mongoose');

// Conectar a la base de datos

  mongoose.connect('mongodb://127.0.0.1:27017/testBackEnd')
  .then(() => console.log('Conexión correcta, bienvendio a la base de datos'))
  .catch(err => console.error('Error al conectarse a la base de datos, verifica tu db:', err));

  module.exports = mongoose.db;
