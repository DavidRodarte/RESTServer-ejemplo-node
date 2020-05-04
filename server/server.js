/**
 * Requerir nuestro archivo de configuración
 */
require('./config/config');

/**
 * Librerías a requerir
 */

/**
 * Para utilizar las rutas y métodos HTTP con facilidad
 */
const express = require('express');
/**
 * body-parser es una librería que nos permite convertir
 * las peticiones provenientes de métodos http en formato legible tipo json
 * para esto, se utiliza bodyParser.json() en el app.use de express
 */
const bodyParser = require('body-parser');
/**
 * mongoose nos permite establecer conexión con BD de MongoDB
 */
const mongoose = require('mongoose');



/********************** */

const app = express();



/**
 * Configuración para app
 */
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

/**
 * Configuración global de rutas
 */
app.use(require('./routes/index'));

/**
 * Conexión a BD Mongo
 * Se utilizaron algunas opciones para evitar DeprecationWarnings
 * de mongoose
 */
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos conectada');
});

app.listen(process.env.PORT, () => {
    console.log('Server iniciado ...');
});