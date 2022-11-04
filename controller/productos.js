const { response } = require('express');
const Producto = require('../models/Producto');

const getProductos = async (req, res = response) => {

    const productos = await Producto.find()
                                    .populate('usuario', 'nombre img')

    res.json({
        ok: true,
        productos
    })
}

const updateProducto = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const productoDB = await Producto.findById( id );
        if ( !productoDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id'
             });
        }
        const cambioProducto = {
            ...req.body,
            usuario: uid
        }

        const productoUpdate = await Producto.findByIdAndUpdate( id, cambioProducto, { new: true})

        res.json({
            ok: true,
            producto: productoUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const createProducto = async (req, res = response) => {

    const uid = req.uid;
    const producto = new Producto({ 
        usuario: uid,
        ...req.body
     });

    try {
        const productoDB = await producto.save();
        
        res.json({
            ok: true,
            msg: 'crear productoes',
            producto: productoDB,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const deleteProducto = async (req, res = response) => {
    const id = req.params.id;

    try {
        const productoDB = await Producto.findById( id );
        if ( !productoDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id'
             });
        }

        await Producto.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'producto eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getProductos,
    updateProducto,
    createProducto,
    deleteProducto
}