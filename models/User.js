const { Schema, model } = require('mongoose');

// se crea el esquema para el usuario
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        }
    },
    {
        toJSON :{
            getters :true
        }
    }

);

const User = model('user',userSchema);

module.exports = User;