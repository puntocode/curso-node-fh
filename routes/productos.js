const { Router } = require('express');
const { check } = require('express-validator');
const { index, store, show, update, deleteProduct } = require('../controllers/ProductoController');
const { existeProductoId, existeCategoryId } = require('../helpers/db-validatos');

const {validarCampos, validarJWT, esAdminRole } = require('../middlewares');


const router = Router();

/**
 * {{url}}/api/productos
 */


//obtener todas los productos - publico
router.get('/', index);


// Crear un producto - privado - se necesita token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'no es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoryId), 
    validarCampos
], store);


//obtener una producto por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoId), 
    validarCampos,
], show);


// Actualizar - privado- se necesita token valido
router.put('/:id', [
    validarJWT,
    check('categoria', 'no es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoId), 
    validarCampos
], update);


// Borra una producto solo ADMIN
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoId), 
    validarCampos,
], deleteProduct);




module.exports = router;