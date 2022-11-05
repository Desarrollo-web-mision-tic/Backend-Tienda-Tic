const { response } = require("express");
const Producto = require("../models/Producto");
const Usuario = require("../models/usuario");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regEx = RegExp(busqueda, "i");

  const [usuarios, productos] = await Promise.all([
    Usuario.find({ nombre: regEx }),
    Producto.find({ nombre: regEx }),
  ]);

  res.json({
    ok: true,
    usuarios,
    productos,
  });
};

const getDocuColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regEx = RegExp(busqueda, "i");

  let data = [];

  switch (tabla) {
    case "productos":
      data = await Producto.find({ nombre: regEx });
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regEx });
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "la tabla tiene que ser usuarios/productos",
      });
      break;
  }

  res.json({
    ok: true,
    resultados: data,
  });
};

module.exports = {
  getTodo,
  getDocuColeccion,
};
