const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Categoria, Producto } = require("../models");


const coleccionesPermitidas = [ 'usuarios', 'productos', 'categorias', 'roles' ];

const buscarUsuario = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const usuario = await User.findById(termino);
        return res.json({ results: (usuario) ? [usuario] : [] });
    }


    const regex = new RegExp(termino, 'i'); //para que sea insensible a mayuscules y minusculas
    const usuarios = await User.find({
        $or: [{nombre: regex}, {correo: regex}], //se busca por nombre o correo
        $and: [{estado: true}]
    });
    return res.json({ results: usuarios });

}



const buscarCategorias = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({ results: (categoria) ? [categoria] : [] });
    }


    const regex = new RegExp(termino, 'i'); 
    const categorias = await Categoria.find({nombre: regex, estado: true});
    return res.json({ results: categorias });

}


const buscarProductos = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const producto = await Producto.findById(termino);
        return res.json({ results: (producto) ? [producto] : [] });
    }


    const regex = new RegExp(termino, 'i'); 
    const productos = await Producto.find({nombre: regex, estado: true}).populate('categoria', 'nombre');
    return res.json({ results: productos });

}



const buscar = (req, res=response) => {
    const {coleccion, termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({message: `Las colecciones permitidas son: ${coleccionesPermitidas}`});
    }

    switch(coleccion){
        case 'usuarios': buscarUsuario(termino, res); break;
        case 'productos': buscarProductos(termino, res); break;
        case 'categorias': buscarCategorias(termino, res); break;
        default: res.status(500).json({message: 'Se olvido hacer esta busqueda'});
    }

}

module.exports = {buscar}