const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  modelo: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  km: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  
});
//crea
ProductoSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Producto", ProductoSchema);
