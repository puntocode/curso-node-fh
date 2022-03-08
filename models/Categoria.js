const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', //tiene que estar igual al module.exports de User
        required: true
    }
});


CategoriaSchema.methods.toJSON = function(){
    const {__v, estado, ...data} = this.toObject();
    return data;
}


module.exports = model('Categoria', CategoriaSchema);