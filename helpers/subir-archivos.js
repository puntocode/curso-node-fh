const path = require('path');
const {v4: uuidv4} = require('uuid');
const fs = require('fs')


const permitidas = ['png', 'jpg', 'jpeg', 'pdf'];

const subirArchivo = (files, carpeta = '', extensionesValidas = permitidas) => {

    return new Promise ((resolve, reject) => {

        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //Validar la extension 
        if(!extensionesValidas.includes(extension)){
            return reject(`La extension ${extension} no es valida, ${extensionesValidas}`);
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../public/images/uploads/', carpeta, nombreTemp);
    
        archivo.mv(uploadPath, (err) => {
            if (err) { return reject(err); }
        
            resolve(nombreTemp);
        });
    });
}


module.exports = { subirArchivo }