const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.js');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    /**
     * Buscar solo un usuario que coincida
     * por email
     */
    Usuario.findOne({
        email: body.email
    }, (err, usuarioDB) => {
        /**Error interno */
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        /**Si no existe */
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        /**Comparar la contraseña 
         * @param1 request del body
         * @param2 usuarioDB
         */
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        /**
         * Firma y creación del token con jwt
         * @param1 datos Obj
         * @param2 seed String
         * @param3 expiración Obj
         */
        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })
    });


});

module.exports = app;