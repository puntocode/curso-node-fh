const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido, existeEmail, existeUserId } = require('../helpers/db-validatos');
const { index, store, update, deleteUser, patch } = require('../controllers/UserController');

// const { validarCampos } = require('../middlewares/validar-user');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');
const {validarCampos, validarJWT, tieneRol } = require('../middlewares');


const router = Router();

router.get('/', index);

router.post('/', [ 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
    check('password', 'El password es obligatorio y contener mas de 6 letras').isLength({min:6}), 
    check('correo', 'El correo no es válido').isEmail(), 
    check('correo').custom(existeEmail), 
    //check('rol').custom(rol => esRolValido(rol) ), cuando enviamos un argumento con el mismo que se pasa se puede obviar 
    check('rol').custom(esRolValido), 
    validarCampos
], store);


router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUserId),
    check('rol').custom(esRolValido), 
    validarCampos
],update);



router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUserId),
    validarCampos
], deleteUser);


router.patch('/', patch);


module.exports = router;