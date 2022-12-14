const { response } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    /* const usuarios = await Usuario
                            .find({}, 'nombre email password role google')
                            .skip( desde )
                            .limit( 5 );

    const total = await Usuario.count();
 */

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email password role google')
            .skip( desde )
            .limit( 5 ),
        Usuario
            .countDocuments(),
        
    ])
    //Generar un TOKEN JWT
    const token = await generarJWT( usuarios.uid );

    res.json({
        ok: true,
        usuarios,
        token,
        uid: req.uid,
        total,

    })
}

const crearUsuario = async (req, res = response) => {
    const { password, email } = req.body;

    try {
        const existEmail = await Usuario.findOne({ email });

        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya existe'
            })
        }

        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password )

        //guardar usuario
        await usuario.save();

        //Generar un TOKEN JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}
const updateUsuario = async (req, res) =>{
    const uid  = req.params.id;

    try {
        const usuarioDB = await Usuario.findById( uid );
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        //actualizamos el usuario
        const { password, google, email, ...campos} = req.body;
        if (usuarioDB.email !== email) {
            const existEmail = await Usuario.findOne({ email});
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email ya existe'
                })
                }
            }   
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true} );
        
        res.json({
            ok: true,
            msg: 'Usuario updated',
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
} 

const deleteUsuario = async (req, res = response) => {
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById( uid );
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        await Usuario.findByIdAndDelete( uid );
        res.json({
            ok: true,
            msg: 'Usuario delete',
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}

module.exports ={
    getUsuarios,
    crearUsuario,
    updateUsuario,
    deleteUsuario
}