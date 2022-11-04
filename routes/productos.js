const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getProductos,
  updateProducto,
  createProducto,
  deleteProducto,
} = require("../controller/productos");

const router = Router();

router.get("/", getProductos);

router.post(
  "/",
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
  ],
  createProducto
);

router.put(
  "/:id",
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  updateProducto
);

router.delete(
  "/:id",
  validarJWT,
  deleteProducto
);

module.exports = router;