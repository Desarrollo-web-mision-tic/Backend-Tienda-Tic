const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken, getUsuari } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/', 
    login
)

router.get('/',
    validarJWT,
    getUsuari,
)


module.exports = router;
