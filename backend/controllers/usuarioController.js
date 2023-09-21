import Usuario from "../models/Usuarios.js";
import generarId from "../helpers/generarId.js";


// Registar usuario
const registrar = async (req, res) =>{
    // Evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email })
    
    // Validacion usuario existe
    if (existeUsuario) {
        const error = new Error("Usuario ya existe")
        return res.status(400).json({msg: error.message})
    }
    // Control del flujo - manejo de errores
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId() // generar token
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)
    } catch (error) {
        console.log(error)
    }
};

const autenticar = async (req, res) => {

    const {email, password} = req.body

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})
    if (!usuario) { // Alerta error
        const error = new Error("El usuario no existe, registrate.")
        return res.status(404).json({msg : error.message})
    }

    // Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) { // Alerta error
        const error = new Error("Tu cuenta aun no ha sido confirmada.")
        return res.status(403).json({msg : error.message})
    }

    // Comprobar su contraseña
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            email: usuario,email
        })
    }else{
        const error = new Error("La contraseña es incorrecta.")
        return res.status(403).json({msg : error.message})
    }
}


export { registrar, autenticar }