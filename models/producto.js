const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    km: {
        type: Number,
        required: true,
    },
    año: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    img:{
        type: String,
    },
    
    
});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Producto', UsuarioSchema);
