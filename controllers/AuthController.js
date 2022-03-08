 const {response} = require('express');
 const User = require('../models/User');
 const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-signin');


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try{
        //verificar si el email existe
        const usuario = await User.findOne({correo});
        if(!usuario) return res.status(400).json({msg: 'Credenciales incorrectas'})

        //verificar si el estado es true
        if(!usuario.estado) return res.status(400).json({msg: 'Credenciales incorrectas'});

        //verificar si la contraseña es correcta
        const validarPass = bcryptjs.compareSync(password, usuario.password);
        if(!validarPass) return res.status(400).json({msg: 'Credenciales incorrectas'});

        //crear JWT
        const token = await generarJWT(usuario.id);

        res.json({usuario, token});

    }catch(err){
        console.error(err);
        res.status(500).json({ msg: 'Hable con el amdin'});
    }

    
}


const googleSignin = async(req, res = response) => {
    const { id_token } = req.body;
    
    try{
        const { name: nombre, picture: img, email: correo } = await googleVerify(id_token);

        let usuario = await User.findOne({correo});
        if(!usuario){
            const data = {nombre, correo, password: ':P', img, google: true};
            usuario = new User(data);
            await usuario.save();
        }

        //si el usuario en BD
        if(!usuario.estado){
            return res.status(401).json({ message: 'Usuario bloqueado o eliminado'});
        }

        //crear JWT
        const token = await generarJWT(usuario.id);


        res.json({usuario, token});
    }catch(err){
        console.error(err);
    }

}

module.exports = {login, googleSignin}