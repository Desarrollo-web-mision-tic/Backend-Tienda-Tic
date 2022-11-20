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
    check('id', 'El ID-Prod es obligatorio').not().isEmpty(),
    check('marca', 'La Marca es obligatoria').not().isEmpty(),
    check('modelo', 'El Modelo es obligatorio').not().isEmpty(),
    check('stock', 'El Stock es obligatorio').not().isEmpty(),
    check('km', 'El Km es obligatorio').not().isEmpty(),
    check('year', 'El Año es obligatorio').not().isEmpty(),
    check('precio', 'El Precio es obligatorio').not().isEmpty(),
    validarCampos
  ],
  createProducto
);

router.put(
  "/:id",
  [
    validarJWT,
    
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