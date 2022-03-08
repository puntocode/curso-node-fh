const dbValidators = require('./db-validatos');
const generarJWT = require('./generar-jwt');
const googleSignin = require('./google-signin');
const subirArchivos = require('./subir-archivos');

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleSignin,
    ...subirArchivos,
}