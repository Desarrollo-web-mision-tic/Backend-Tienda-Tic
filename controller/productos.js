const { response } = require('express');
const Producto = require('../models/Producto');

const getProductos = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;
    
    const [productos, total] = await Promise.all([
        Producto
            .find({}, 'nombre modelo stock marca km year precio img')
            .skip( desde )
            .limit( 20 ),
        Producto
            .countDocuments(),
        
    ])
    //creando 

    /* const productos = await Producto.find()
                                    .populate('producto', 'nombre') */

    res.json({
        ok: true,
        productos,
        uid: req.uid,
        total
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
        console.log(productoDB);
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
            msg: 'crear productos',
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