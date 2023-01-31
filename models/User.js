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
            match : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/  //validar entrada y formato de correo en minusculas
        },
        friends :[
            {
                type: Schema.Types.ObjectId,
                ref : 'user'   //referencia al nombre del modelo case sensitive
            }
        ]
    },
    {
        toJSON :{
            virtuals : true, //incluir las propiedades virtuales en el json
        },
        id : false //para que no incluya el id en los virtuales.
    }

);

//esquema virtual llamado friendCount que recupere la longitud del campo de matriz de friends del usuario en la consulta
userSchema.virtual('friendCount').get( function () {
    return this.friends.length;
});


const User = model('user',userSchema);

module.exports = User;