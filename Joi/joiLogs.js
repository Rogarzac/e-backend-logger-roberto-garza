// modulos necesarios
const Joi = require('joi');

//Validacion de la información en Logs mediante Joi
const joilogs = (data) => {
    const schema = Joi.object({
      application_id: Joi.string().required(),
      type: Joi.string().valid('error', 'info', 'warning').required(),
      priority: Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest').required(),
      path: Joi.string().required(),
      message: Joi.string().required(),
      request: Joi.object({
        data: Joi.any()
      }),
      response: Joi.object({
        data: Joi.any()
      })
    });
  
    return schema.validate(data);
  };
  
  module.exports = joilogs;


