import mongoose from "mongoose";
import bcrypt from "bcrypt"

const usuarioSchema = mongoose.Schema({
    nombres:{
        type: String,
        required: true,
        trim: true
    },
    apellidos:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    token:{
        type: String,
    },
    confirmado:{
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true,
}
);

usuarioSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Usuario = mongoose.model("Usuario", usuarioSchema)
export default Usuario; 