const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json(errors);
    next();
}

module.exports = { validarCampos }

//next tengo que pasar si el middleware es correcto