/**
 * Requerir nuestro archivo de configuración
 */
require('./config/config');

const express = require('express');
const app = express();

/**
 * body-parser es una librería que nos permite convertir
 * las peticiones provenientes de métodos http en formato legible tipo json
 * para esto, se utiliza bodyParser.json() en el app.use de express
 */
const bodyParser = require('body-parser');

/**
 * 
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        'ok':1,
        'mensaje':'hola'
    });
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    if( body.nombre === undefined ){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    }else{
        res.json({
            'persona' : body
        });
    }

    
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;

    res.json({
        'mensaje': `Usuario ${id}`
    });
});

app.listen(process.env.PORT, () => {
    console.log('Server iniciado ...');
});

