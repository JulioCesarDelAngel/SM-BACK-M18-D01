const { User, Thought } = require('../models');


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
            else{
                //eliminar Thoughts si existen
                console.log('Pensamientos:', data.thoughts);
                result = await Thought.deleteMany({ _id: { $in: data.thoughts } });
                response.status(200).json({code:200, message : 'Usuario y pensamientos eliminados', data:[]}); 
            }
            
        }
        catch ( error ){
            response.status(500).json( error );
        }
    },

    async updateUser(request, response){
        try {
            data = await User.findOneAndUpdate({ _id: request.params.userId }, request.body, { new: true } ) //  new: true para que devuelva el docto actualizado )
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
    },

    async deleteFriend(request, response) {
        try {
            data = await User.findByIdAndUpdate(
                {_id : request.params.userId},
                {$pull: {friends: {$in : [request.params.friendId]}  } }, { new : true}
                );
                console.log('resultSET',data)
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