const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    }, 
    admin:{
        type: Boolean,
        required: true,
        default: false
    }
});

UserSchema.pre('save', async function(next){
   const hash = await bcrypt.hash(this.senha,10);
   this.senha = hash;
   next();
});

const usuarios = mongoose.model('User', UserSchema);
module.exports = usuarios;