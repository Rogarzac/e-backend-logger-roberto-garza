'use strict';
// modulos enecesarios
const router = require('express').Router();
const aplicationControllers = require('../controllers/aplicationControllers.js');
//Prefijo solicitado
const prefix = 'aplication';


//Rutas definidas
router.get(`/${prefix}/`, aplicationControllers.list)
router.post(`/${prefix}/`,  aplicationControllers.create); 
router.get(`/${prefix}/:id`,  aplicationControllers.show); 
router.put(`/${prefix}/:id`,  aplicationControllers.update);
router.delete(`/${prefix}/:id`,  aplicationControllers.delete);

module.exports = router;