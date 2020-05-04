const jwt = require('jsonwebtoken');
/**
 * Verificar token de autentificación
 */

let verificaToken = (req, res, next) =>{
    /**
     * Obtenemos el token desde el header, en este caso
     * lo llamaremos "token", igual es común que se le llame
     * Authorization
     */
    let token = req.get('token');
    
    jwt.verify(token, process.env.SEED, (err, decoded) =>{

        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();

    });
};

module.exports = {
    verificaToken
};