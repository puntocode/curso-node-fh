const { check } = require('express-validator');
const { Router } = require('express');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/UploadController');

const router = Router();


router.post('/', validarArchivoSubir, cargarArchivo); //cuando ocupa solo un middleware no necesita un array

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id no es un id de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['users', 'productos']) ),
    validarCampos
], actualizarImagen)


router.get('/:coleccion/:id', [
    check('id', 'El id no es un id de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['users', 'productos']) ),
    validarCampos
], mostrarImagen)

module.exports = router;