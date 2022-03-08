const Role = require('../models/Role');
const {User, Categoria, Producto} = require('../models');



const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol) throw new Error(`El rol ${rol} no es válido`);
}

//validar correo
const existeEmail = async(correo) => {
    const existe = await User.findOne({correo});
    if(existe) throw new Error(`El correo ya está registrado`);
}


//validar user por id
const existeUserId = async(id) => {
    const existe = await User.findById(id);
    if(!existe) throw new Error(`El id no existe`);
}

/**
 * Validar categoria por id
 * @param {*} id 
 */
const existeCategoryId = async(id) => {
    const existe = await Categoria.findById(id);
    if(!existe) throw new Error(`El id no existe`);
}


/**
 * Validar producto por id
 * @param {*} id 
 */
 const existeProductoId = async(id) => {
    const existe = await Producto.findById(id);
    if(!existe) throw new Error(`El id no existe`);
}


/**
 * Validar colecciones permitidas
 * @param {*} coleccion
 */
const coleccionesPermitidas = (coleccion, colecciones = []) => {
    const existe = colecciones.includes(coleccion);
    if(!existe) throw new Error(`La colección ${coleccion} no es permitida: ${colecciones}`);

    return true;
}


module.exports = { 
    esRolValido, 
    existeEmail, 
    existeUserId, 
    existeCategoryId, 
    existeProductoId,
    coleccionesPermitidas
};