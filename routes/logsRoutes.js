'use strict';
// modulos enecesarios
const router = require('express').Router();
const logsControllers = require('../controllers/logsControllers.js');
const  aut  = require('../middleware/autthenticateToken.js');
//Prefico solicitado
const prefix = 'logs';

  
//Rutas definidas
router.get(`/${prefix}/`, aut , logsControllers.list)
router.post(`/${prefix}/`, aut , logsControllers.create); 
router.get(`/${prefix}/:id`, aut , logsControllers.show); 
router.put(`/${prefix}/:id`, aut , logsControllers.update);
router.delete(`/${prefix}/id`, aut , logsControllers.delete);

module.exports = router;