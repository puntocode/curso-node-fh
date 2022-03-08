const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/User");


const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    console.log(token);

    if(!token) return res.status(401).json({msg: 'Unauthorized'});

    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await User.findById(uid);
        
        // verificamos que estado true
        if(!usuario.estado) return res.status(401).json({message: 'Unauthorized'});
        
        req.usuario = usuario;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({message: 'Token no válido'});
    }
}

module.exports = {validarJWT}