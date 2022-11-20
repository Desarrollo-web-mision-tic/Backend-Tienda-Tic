const { getVentas, postVentas } = require("../controller/ventas");
const { validarJWT } = require("../middlewares/validar-jwt");
const { Router } = require("express");

const router = Router();

router.get('/', validarJWT, getVentas)

router.post('/', validarJWT, postVentas);

module.exports = router;