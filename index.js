require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

//dominios
const whiteList = ['http://localhost:4000'];


// Configurar CORS
app.use( cors() );

//lectura y parseo del body
app.use(express.json());


// Base de datos
dbConnection();

//Directorio publico
app.use( express.static('public') );

// Rutas
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/productos', require('./routes/productos'));
app.use('/api/ventas', require('./routes/ventas'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth') );
app.use('/api/upload', require('./routes/uploads') );


app.listen( process.env.PORT, process.env.HOST, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});