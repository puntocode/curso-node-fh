const { response } = require("express");
const { Categoria } = require('../models');


const index = async(req, res = response) => {
    const query = {estado: true};
    const {limite = 5, desde = 0} = req.query;

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('user', ['nombre', 'correo'])
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({total, categorias});
}


const store = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB) return res.status(400).json({message: `La categoria ${categoriaDB.nombre} ya existe`});


    //Generar la data a guardar
    const data = {nombre, user: req.usuario._id};
    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);
}



const show = async(req, res= response) => {
    const {id} = req.params;    
    const categoria = await Categoria.findById(id).populate('user', 'nombre');
    res.json(categoria);
}


const update = async(req, res=response) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});

    res.json(categoria);

}


const deleteCategory = async(req, res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true}); //oara ver los cambios reflejados en el json
    res.json(categoria);
}


module.exports = {store, index, show, update, deleteCategory}