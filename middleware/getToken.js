// modulos necesarios
const jwt = require('jsonwebtoken');

//obtener un token por variable de entorno
const getToken = (application_id) => {
  const token = jwt.sign({application_id} , process.env.JWT_KEY, {
  });

  return token;
};

  
  module.exports = getToken;