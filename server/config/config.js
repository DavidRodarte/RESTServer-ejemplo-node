/* Puerto */
process.env.PORT = process.env.PORT || 3000;

/**
 * Expiración del token
 * 60 segundos
 * 60 minutos
 * 24 horas
 * 30 días
 */
process.env.CADUCIDAD_TOKEN = 60*60*24*30;

/**
 * Seed de autenticación 
 */

process.env.SEED = process.env.SEED || 'seed-secreto';

/**
 * Configuración del entorno,
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Bases de datos,
 * definimos una variable de entorno MONGO_URI en caso de que
 * la conexión sea a una base de datos en producción
 */

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

/**
 * Creamos una variable de entorno
 * con la configuración de la urlDB
 */

process.env.URLDB = urlDB;