const { Schema, model} = require('mongoose');

const VentaSchema = Schema({

    productos: {
        required: true,
        type: [{idProducto: {type: Schema.Types.ObjectId},
        cantidad: {type: Number}}
            ],
        ref: "Producto",
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Usuario",
    },
    
    registro: {
        type: Date,
        default: Date.now()
    }
});

VentaSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Venta', VentaSchema);