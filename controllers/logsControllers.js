'use strict';

// modulos enecesarios
const Logs = require("../models/logsModel.js");
const joiLogs = require('../Joi/joiLogs');



// Get para obtener los logs
module.exports.list = async function (req, res, next) {

    try {
        const logs = await Logs.find().populate('application_id');

        if (logs.length === 0) return res.status(200).json({ message: 'No hay elementos que mostrar.' });

        return res.status(200).json(logs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}



// Get para obtener solo un log basandose en su id
module.exports.show = async function (req, res) {

    try {
        const log = await Logs.findOne({ application_id: req.params.id }).populate('application_id');
        if (!log) {
            return res.status(404).send({ message: 'Log no encontrado' });
        }
        res.status(200).send(log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}


// Post para crear una nueva aplicacion
exports.create = async (req, res = response) => {
    try {

        const { error } = joiLogs(req.body);
        if (error) return res.status(400).send({ error:error.details[0].message});

        const log = new Logs(req.body);
        const save = await log.save();

        res.status(201).json(save);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/// PUT para editar una aplicacion basandose en su id
module.exports.update = async (req, res = response) => {

    const { error } = joiLogs(req.body);

    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
        const updatedLog = await Logs.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedLog) {
            return res.status(404).send({ message: 'Log no encontrado' });
        }

        res.status(200).send(updatedLog);
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el log' });
    }
}

  




// Delete para borrar un log con base en su id
module.exports.delete = async function (req, res) {
    try {
        const deletedLog = await Logs.findByIdAndDelete(req.params.id);

        if (!deletedLog) {
            return res.status(404).send({ message: 'Log no encontrado' });
        }

        res.status(200).send({ message: 'Log eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el log' });
    }
}


