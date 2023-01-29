

module.exports = {
    getUsers(request, response){
        response.status(200).json({code:'200', message:'TODOS LOS usuarios demo', data:[]});
    },
    getSingleUser(request,response){
        response.status(200).json({code:'200', message:'SOLO UN  DinoUsuario', data:[{userId:`${request.params.userId}`,name:"el usuario demo"}]});
    },
    createUser(request, response){
        response.status(200).json({code:'200', message:'CREAR un Usuario', data:[{userId:`${request.params.userId}`,name:"nuevo usuario demo"}]});
    },
    deleteUser(request, response){
        response.status(200).json({code:'200', message:'BORRAR Usuario', data:[{userId:`${request.params.userId}`,name:"usario eliminado demo"}]});
    },
    updateUser(request, response){
        response.status(200).json({code:'200', message:'ACTUALIZAR Usuario', data:[{userId:`${request.params.userId}`,name:"usuario actualizado demo"}]});
    }
};