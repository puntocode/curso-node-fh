const { response } = require("express");
const { request } = require("express");

//loos errores 500 son del backend

const esAdminRole = (req = request, res = response, next) => {
    if(!req.usuario){
        return res.status(500).json({message: 'Se quiere comprobar el rol sin verificar el token'});
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({message: 'No es administrador'});
    }

    next();
}


const tieneRol = (...roles) => {
    return (req, res = response, next) => {
        if(!req.usuario){
            return res.status(500).json({message: 'Se quiere comprobar el rol sin verificar el token'});
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({message: `Se requiere uno de estos roles ${roles}`})
        }

        next();
    }
}

module.exports = { esAdminRole, tieneRol }