const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/AuthController');
const { validarCampos } = require('../middlewares/validar-user');

const router = Router();

router.post('/login', [
    check('correo', 'El correo no es válido').isEmail(), 
    check('password', 'El password es obligatorio').not().isEmpty(), 
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El id_token es obligatorio').not().isEmpty(), 
    validarCampos
], googleSignin);

module.exports = router;