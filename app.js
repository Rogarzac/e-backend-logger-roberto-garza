
// modulos necesarios
const db = require('./db/db.js')
const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');




const app = express();
//metodos de expres
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//modulos de mis rutas
const aplications = require('./routes/aplicationRoutes.js')
const logs = require('./routes/logsRoutes.js')

app.use('/api', aplications)
app.use('/api', logs)


module.exports = app;


