const { Router } = require('express');
const { check } = require('express-validator');
const { index, store, show, update, deleteCategory } = require('../controllers/CategoriasController');
const { existeCategoryId } = require('../helpers/db-validatos');

const {validarCampos, validarJWT, tieneRol, esAdminRole } = require('../middlewares');


const router = Router();

/**
 * {{url}}/api/categorias
 */


//obtener todas las categorias - publico
router.get('/', index);

// Actualizar - privado- se necesita token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoryId), 
    validarCampos
], update);


// Crear un categoría - privado - se necesita token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], store);

//obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeCategoryId), 
    validarCampos,
], show);

// Borra una categoría solo ADMIN
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeCategoryId), 
    validarCampos,
], deleteCategory);




module.exports = router;