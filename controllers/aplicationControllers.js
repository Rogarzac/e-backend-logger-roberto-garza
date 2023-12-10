'use strict';
// modulos enecesarios
const mongoose = require('mongoose');
const Aplication = require("../models/aplicationModel.js");
const Authorization = require('../models/authorizationsModel.js')
const joiAplication  = require('../Joi/joiAplication.js');
const getToken = require('../middleware/getToken.js')




// Get para obtener todas las aplicaciones
module.exports.list = async function (req, res, next) {
  try {
    const aplications = await Authorization.find().populate('application_id');

    if (aplications.length == 0){
      return res.status(200).json({ message: 'No hay aplicaciones registradas.' });
    } 

    return res.status(200).json(aplications);
  } catch (error) {
      return res.status(500).json({ message: 'Error getting aplications', error: error.message });
  }
};



// Get para obtener solo una aplicacion basandose en su id
module.exports.show = async function (req, res) {
  try {
    const aplication = await Authorization.findOne({ 'application_id': req.params.id }).populate('application_id');

    if (!aplication) {
      return res.status(404).send({ message: 'Aplicación no encontrada, verifique ID.' });
    }

    return res.status(200).send(aplication);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Post para crear una nueva aplicacion
module.exports.create = async (req, res = response) => {

  // Iniciar Transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const { error } = joiAplication(req.body);

    if (error) return res.status(400).send({ message: error.details[0].message });

    //se guarda aplicacion
    const aplication = new Aplication(req.body);
    const aplicationId = await aplication.save();

    //genero el token y se guarda 
    const token = getToken(aplicationId._id);
    const authorization = new Authorization({ application_id: aplicationId._id, token });
    await authorization.save();

    // Confirmar transacción
    await session.commitTransaction();
    console.log('Transaction committed');

    return res.status(201).json(aplicationId);

  } catch (error) {
    // Rollback de transacción en caso de error
    await session.abortTransaction();
    return res.status(500).json({ error: error.message });
  } finally {
    // Finalizar sesión
    session.endSession();
  }
}

// PUT para editar una aplicacion basandose en su id
module.exports.update = async (req, res, next) => {

  const { error } = joiAplication(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  try {

    const updatedAplication = await Aplication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedAplication) {
      return res.status(404).send({ message: 'Aplicación no encontrado.' });
    }

    return res.status(200).send(updatedAplication);
  } catch (error) {
    return res.status(500).send({ error: 'Error al actualizar la aplicación.' });
  }
}




// Delete para borrar una aplicacion basandose en su id
module.exports.delete = async function (req, res) {
  try {
    const deletedLog = await Aplication.findByIdAndDelete(req.params.id);
    

    if (!deletedLog) {
      return res.status(404).send({ message: 'Aplicación no encontrada' });
    }
    
    await Authorization.deleteOne({ 'application_id': req.params.id });

    return res.status(200).send({ message: 'Aplicación eliminada correctamente' });
  } catch (error) {
    return res.status(500).send({ error: 'Error al eliminar la aplicación', error });
  }
}


