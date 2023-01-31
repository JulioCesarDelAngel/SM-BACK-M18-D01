const { User } = require('../models');
const { findByIdAndUpdate } = require('../models/User');

module.exports = {
    async getUsers(request, response){
        try {
            let data = await User.find({});
            response.status(200).json(data); 
        }
        catch ( error ){
            response.status(500).json( error );
        }
    },
    async getSingleUser(request,response){
        try {
            let data =  await User.findById(request.params.userId);
            response.status(200).json(data);     
        }
        catch ( error ){
            response.status(500).json( error );
        }
    },
    async createUser(request, response) {
        try {
            data = await User.create(request.body);
            response.status(200).json(data); 

/*              let exists = await User.findOne({ 
                    $or : [
                            {'username' :`${request.body.username}`},
                            {'email': `${request.body.email}`}
                        ]});

            if (!exists){
                data = await User.create(request.body);
                response.status(200).json(data); 
            }
            else
            {
                response.json({code:500, message:"Usuario ya existe", data :[]})
            } */
        }
        catch ( error ){
            response.status(500).json( error );
            /* console.log("error", error);
            if (error.code ==11000)
            {
                console.log("usuario ya existe");
            } */            
        }
        
    },
    async deleteUser(request, response){
        try {
            let data  = await User.findByIdAndDelete(request.params.userId);
            if (!data){
                response.status(404).json({code:404, message:"no se encontro el usuario",data:[]}); 
                return
            }
            response.status(200).json(data); 
        }
        catch ( error ){
            response.status(500).json( error );
        }
    },
    updateUser(request, response){
        response.status(200).json({code:'200', message:'ACTUALIZAR Usuario', data:[{userId:`${request.params.userId}`,name:"usuario actualizado demo"}]});
    },

    async addFriend (request, response){
        try {
            console.log('datos', request.params);
            let data = await User.findByIdAndUpdate(
                {_id : request.params.userId},
                {$addToSet: {friends: request.params.friendId} }, { new : true}
            );
            if (!data){
                response.status(404).json({code:404, message:"no se encontro el usuario",data:[]}); 
                return
            }
            response.status(200).json(data); 
        }
        catch ( error ){
            response.status(500).json( error );
        }
    }
};