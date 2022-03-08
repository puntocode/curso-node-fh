const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true,
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String},
    img: { type: String},
    disponible: {type: Boolean, default: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', //tiene que estar igual al module.exports de User
        required: true
    }
});


ProductoSchema.methods.toJSON = function(){
    const {__v, estado, ...data} = this.toObject();
    return data;
}


module.exports = model('Producto', ProductoSchema);