const mongoose = require('mongoose');
/**
 * Utilizaremos la librería mongoose-unique-validator 
 * para mostrar mensajes personalizados en caso de que se repita 
 * un campo unique
 */
const uniqueValidator = require('mongoose-unique-validator');
/**
 * Obtenemos el objeto Schema a partir de la librería de mongoose
 */
let Schema = mongoose.Schema;


/**
 * Objeto en donde tendremos definidos
 * los roles de la aplicación
 * *
 * Utilizaremos {VALUE} para obtener el valor
 * proveniente del usuario
 */
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

/**
 * Objeto usuarioSchema de tipo Schema,
 * el constructor recibe la declaración del modelo de usuario
 */
let usuarioSchema = new Schema({
    nombre: {
        /**
         * Tipo de dato String
         */
        type: String,
        /**Si hacemos un array en el required, podemos especificar
         * un mensaje de error en caso de que no se cumpla la condición
         */
        required: [true, 'El nombre es obligatorio'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        /**
         * Para poder validar los roles, podemos utilizar la propiedad "enum", 
         * que recibe un objeto en donde especificamos los valores permitidos
         */
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

/**
 * Modificaremos el método toJSON de usuarioSchema,
 * ya que este método se llama cada que se quiere mostrar info.
 * de el usuario, por ejemplo, al momento de registrar y querer
 * mostrar algunos datos relevantes pero omitir otros
 */

 usuarioSchema.methods.toJSON = function(){
     let user = this;
     let userObject = user.toObject();
     delete userObject.password;

     return userObject;
 }

/**
 * Utilizamos el plugin de uniqueValidator 
 * en usuarioSchema, se utiliza {PATH} para obtener
 * el nombre del campo
 */
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
});

/**
 * El módulo a exportar de este archivo será 
 * usuarioSchema nombrado como Usuario
 */
module.exports = mongoose.model('Usuario', usuarioSchema);