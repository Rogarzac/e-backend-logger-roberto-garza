// modulos necesarios
const Joi = require('joi');

//Validacion de la información de las aplicaciones mediante Joi
 const joiAplication =(data) => {
    const schema = Joi.object({
        name: Joi.string().required()
    })
    return schema.validate(data);
 };

module.exports = joiAplication;