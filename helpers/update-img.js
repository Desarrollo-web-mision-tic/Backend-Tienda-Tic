const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const fs = require('fs');

const deleteImagen = ( path ) =>{
            if (fs.existsSync( path )) {
                //borrar imagen anterior 
                fs.unlinkSync( path )
            }
}

const updateImg = async (tipo, id, nombreArchivo) => {

    switch ( tipo ) {
        case 'productos':
            const producto = await Producto.findById( id );
            if ( !producto) {
                console.log('no es un medico id')
                return false;
            }
            const pathViejo = `./uploads/productos/${ producto.img }`;
            deleteImagen( pathViejo );

            producto.img = nombreArchivo;
            await producto.save();
            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById( id );
            if ( !usuario) {
                console.log('no es un usuario id')
                return false;
            }
            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            deleteImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
    
        default:
            break;
    }

}

module.exports = {
    updateImg,
}
