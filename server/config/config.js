/* Puerto */
process.env.PORT = process.env.PORT || 3000;

/**
 * Configuración del entorno,
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Bases de datos
 */

 if(process.env.NODE_ENV === 'dev'){
     urlDB = 'mongodb://localhost:27017/cafe';
 }else{
     urlDB = 'mongodb+srv://drodarte:hrk34x9ogxqOT6db@cluster0-h2kzn.mongodb.net/cafe';
 }

 /**
  * Creamos una variable de entorno
  * con la configuración de la urlDB
  */

  process.env.URLDB = urlDB;