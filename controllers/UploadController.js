const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { User, Producto } = require("../models");
const { fstat } = require('fs');


const cargarArchivo = async(req, res = response) => {
    const name = await subirArchivo(req.files);
    res.json({archivo: name})
}



const actualizarImagen = async(req, res=response) => {
  const {id, coleccion} = req.params;

  let modelo;

  switch (coleccion){
    case 'users':
      modelo = await User.findById(id);
      if(!modelo) return res.status(400).json({ message: `No existe un user con el id ${id}`});
      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if(!modelo) return res.status(400).json({ message: `No existe un producto con el id ${id}`});
      break;
  }

  //Limpiar imagenes previas
  if(modelo.img){
    const pathImg = path.join(__dirname, '../public/images/uploads', coleccion, modelo.img);
    if(fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
  }

  const name = await subirArchivo(req.files, coleccion);
  modelo.img = name;
  await modelo.save();

  res.json({modelo});
}



const mostrarImagen = async(req, res=response) => {
  const {id, coleccion} = req.params;

  let modelo;
  const pathNoImg = path.join(__dirname, '../public/assets/no-image.jpg');

  switch (coleccion){
    case 'users':
      modelo = await User.findById(id);
      if(!modelo) return res.sendFile(pathNoImg);
      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if(!modelo) return res.sendFile(pathNoImg);
      break;
  }


  //Preguntar si tiene imagen
  if(modelo.img){
    const pathImg = path.join(__dirname, '../public/images/uploads', coleccion, modelo.img);
    if(fs.existsSync(pathImg)) return res.sendFile(pathImg);
  }

  
  return res.sendFile(pathNoImg);
}


module.exports = {cargarArchivo, actualizarImagen, mostrarImagen}