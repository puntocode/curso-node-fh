const { response } = require('express');
const User = require('../models/User');
const bcryptjs = require('bcryptjs')

const index = async(req, res = response) => {
    const query = {estado: true};

    let {limite=5, desde = 0} = req.query;
    limite = Number(limite);
    desde = Number(desde);

    // const usuario = await User.find()
    //     .skip(Number(desde))
    //     .limit(Number(limite)); 

    // const total = await User.countDocuments(query);

    const [total, usuario] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(desde).limit(limite)
    ]);

    res.json({ total, usuario });
}

const store = async(req, res = response) => {
    //const body = req.body;
    const { nombre, correo, password, rol } = req.body;
    const usuario = new User({nombre, correo, password, rol});
    
    //encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    
    await usuario.save();
    
    res.status(201).json({
        usuario
    })
}

const update = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...user } = req.body;

    //validar contra la BD
    if(password){
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await User.findByIdAndUpdate(id, user);

    res.json({
        msg: 'update Users',
        usuario
    })
}

const deleteUser = async(req, res = response) => {
    const { id } = req.params;

    //Borrado Fisico
    // const usuario = await User.findByIdAndDelete(id);
    const userAuth = req.usuario;
    const usuario = await User.findByIdAndUpdate(id, {estado:false});


    res.json({usuario, userAuth})
}

const patch = (req, res = response) => {
    res.json({
        msg: 'patch Users'
    })
}



module.exports = { index, store, update, deleteUser, patch}