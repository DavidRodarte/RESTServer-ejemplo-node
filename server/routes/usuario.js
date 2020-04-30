const express = require('express');

/**Librería bcrypt para generar hash de contraseñas */
const bcrypt = require('bcrypt');
/**
 * Librería underscore, que añade varias características a JS,
 * la utilizaremos para añadir validaciones a los request que se hagan 
 * a nuestra RESTAPI
 */
const _ = require('underscore');

const app = express();

const Usuario = require('../models/usuario.js');

/**
 * Obtener los usuarios
 */
app.get('/usuario', (req, res) => {

    /**
     * Utilizamos parámetros opcionales para
     * poder paginar los usuarios
     */
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado:true}, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({estado:true}, (err, total) => {
                res.json({
                    ok: true,
                    total,
                    usuarios
                })
            });
        });
});

/**
 * Ruta POST para crear usuario
 */
app.post('/usuario', (req, res) => {
    let body = req.body;

    /**
     * Definimos los datos que se insertarán en la BD
     * En caso del password, usaremos bcrypt para generar el hash
     */
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    /** 
     * Utilizamos el método .save() de mongoose para guardar
     */

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se pudo crear el usuario',
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});

/**
 * Actualización del usuario
 */
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    /**
     * Utilizamos el método pick de underscore (_)
     * para poder definir las keys que podremos recibir en nuestra RESTAPI,
     * se especifican en el segundo parámetro como un array
     */
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    /**
     * Usamos new:true en el 3° parámetro
     * para que al actualizar (mandando info. en el body de la petición),
     * nos devuelva el JSON con los cambios ya actualizados
     */
    Usuario.findByIdAndUpdate(id, body, {
        new: true,
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuarioDB
        })
    });


});

/**
 * Eliminar usuario
 */
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, {estado:false}, {new:true}, (err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            message: 'El usuario fue desactivado',
            usuarioDB
        })
    });

    /* 
     *   Elimina de manera permanente el usuario 
     *   Comentar o descomentar según sea el caso
     */
    /* Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
     
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se encontró el usuario'
                }
            });
        }
        res.json({
            ok: true,
            usuarioBorrado
        })
    }); */
});

/**
 * Se exporta app de este archivo
 */
module.exports = app;