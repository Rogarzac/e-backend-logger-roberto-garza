
// modulos enecesarios
const jwt = require('jsonwebtoken');
const Authorizations = require('../models/authorizationsModel');

// Verificar la autenticación
async function authenticate(req, res, next) {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization;

  // Verificar si se proporcionó un token
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    // Verificar la validez del token y obtener el payload
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // Obtener el ID de la aplicación a partir del token decodificado
    const appId = decoded.application_id;
    // Busca la autorización en la base de datos
    const auth = await Authorizations.findOne({ application_id: appId, token });
    // Verificar si se encontró una autorización
    if (!auth) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'No autorizado' });
  }
}

// Exportar la función middleware
module.exports = authenticate;

