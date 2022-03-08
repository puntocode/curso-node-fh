const { response } = require("express");
const { Producto } = require('../models');


const index = async(req, res = response) => {
    const query = {estado: true};
    const {limite = 5, desde = 0} = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('user', ['nombre', 'correo'])
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({total, productos});
}


const store = async(req, res = response) => {
    const {estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre: body.nombre});

    if(productoDB) return res.status(400).json({message: `El producto ${productoDB.nombre} ya existe`});


    //Generar la data a guardar
    const data = {nombre: body.nombre.toUpperCase(), user: req.usuario._id, ...body};
    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);
}



const show = async(req, res= response) => {
    const {id} = req.params;    
    const producto = await Producto.findById(id)
        .populate('user', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto);
}


const update = async(req, res=response) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    if(data.nombre) data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new:true});
    res.json(producto);
}


const deleteProduct = async(req, res = response) => {
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true}); //oara ver los cambios reflejados en el json
    res.json(producto);
}


module.exports = {store, index, show, update, deleteProduct}