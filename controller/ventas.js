const { response } = require('express');
const Venta = require('../models/ventas');
const Producto = require('../models/Producto');

const postVentas = async ( req, res ) => {

    const uid = req.uid;
    const venta = new Venta({ 
        usuario: uid,
        productos: req.body
     });
     console.log(req.body);

    try {
        const ventaDB = await venta.save();
        
        res.json({
            ok: true,
            msg: 'crear venta',
            venta: ventaDB,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getVentas = async ( req, res = response ) => {

    try {
        const venta = await Venta.find({ usuario: req.uid });
        console.log(venta);
        res.json({ venta })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

module.exports = {
    getVentas,
    postVentas
}
