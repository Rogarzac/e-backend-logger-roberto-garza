// modulos necesarios
const mongoose =require('mongoose');

//Esquema de autorizacion
const Schema = mongoose.Schema;
const authorizationsSchema = new Schema({

    application_id:{ type:Schema.Types.ObjectId, ref: 'Aplication', require:true },
    token:{ type:String, require:true},
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now}
     });

// creamos y exportamos el modelo de autorizacion
const Authorizations = mongoose.model('Authorizations', authorizationsSchema);
module.exports = Authorizations;