const { User } = require('../models');

module.exports = {
    getUsers(request, response){
        response.status(200).json({code:'200', message:'TODOS LOS usuarios demo', data:[]});
    },
    getSingleUser(request,response){
        response.status(200).json({code:'200', message:'SOLO UN  DinoUsuario', data:[{userId:`${request.params.userId}`,name:"el usuario demo"}]});
    },
    async createUser(request, response) {
        //response.status(200).json({code:'200', message:'CREAR un Usuario', data:[{userId:`${request.params.userId}`,name:"nuevo usuario demo"}]});
        try {

             let exists = await User.findOne({ 
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
                response.json({code:500, message:"usuario ya existe", data :[]})
            }
        }
        catch ( error ){
            response.status(500).json( error );
        }
        
    },
    deleteUser(request, response){
        response.status(200).json({code:'200', message:'BORRAR Usuario', data:[{userId:`${request.params.userId}`,name:"usario eliminado demo"}]});
    },
    updateUser(request, response){
        response.status(200).json({code:'200', message:'ACTUALIZAR Usuario', data:[{userId:`${request.params.userId}`,name:"usuario actualizado demo"}]});
    }
};