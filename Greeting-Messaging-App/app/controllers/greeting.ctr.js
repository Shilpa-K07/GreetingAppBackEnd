const greetingService = require('../services/greeting.svc.js');
const validate = (pattern, input) => pattern.test(input);
const NAME_PATTERN = /^[A-Za-z]{2,}$/;
class GreetingController{

    /**
     * @description Create and save a new greeting
     * @param NAME_PATTERN is used to validate name
     * @param res is used to send the response
     */
    create = (req, res) => {
        const request = req;
        const response = res;

        if(!request.body.name){
            return response.status(400).send({
                success : false,
                message : "Greeting name can not be empty"
            });
        }

        if(!validate(NAME_PATTERN, request.body.name)){
            return response.status(400).send({
                success : false,
                message : "Name should contain only characters of minimum length 2"
            });
        }

        greetingService.create(request, function(error, data){
            if(error){
                return response.status(500).send({
                success : false,
                message : "Some error occurred while creating greeting"
                });
            }
            response.send({
                success : true,
                message : "Greeting added successfully !",
                data    : data
            });
       });
    }

    /**
     * @description Find all the greeting
     * @method findAll is service class method
     */
    findAll = (req, res) => {
        const request = req;
        const response = res;

        greetingService.findAll(request, function(error, data){
            if(error){
                return response.status(500).send({
                    success : false,
                    message : "Some error occurred while retrieving greetings"
                });
            }
            response.send({
                success : true,
                message : "Successfully retrieved greetings !",
                data    : data
            });
        });
    }
         
    /**
     * @description Find greeting by id
     * @method findOne is service class method
     * @param response is used to send the response
     */
    findOne = (req, res) => {
        const request = req;
        const response = res;

        greetingService.findOne(request, function(error, data) {
            if(error){
                return response.status(500).send({
                    success : false,
                    message : "Error retrieving note with id " + request.params.greetingID
                });
            }
            if(!data){
                return response.status(404).send({
                    success : false,
                    message : "Greeing not found with id" +request.params.greetingID
                });
            }
            response.send({
                success : true,
                message : "Successfully retrieved greeting",
                data    : data
            });
        });
    }
       
    /**
     * @description Update greeting by id
     * @method update is service class method
     * @param res is used to send the response
     */
    update = (req, res) => {
        const request = req;
        const response = res;

        greetingService.update(request, function(error, data) {
            if(error){
                return response.status(500).send({
                    success : false,
                    message: "Error updating greeting with id "+request.params.greetingID
                });
            }
            if(!data) {
                return response.status(404).send({
                    success : false,
                    message: "Greeting not found with id "+request.params.greetingID
                });
            }
            response.send({
                success : true,
                message : "Greeting updated successfully !",
                data    : data
            });
        });
    }

     /**
     * @description Update greeting with id
     * @method delete is service class method
     * @param response is used to send the response 
     */
    delete(req, res){
        const request = req;
        const response = res;

        greetingService.delete(request, function(error, data) {
            if(error){
                return response.status(500).send({
                    success : false,
                    message : "Could not delete greeting with id "+request.params.greetingID
                });
            }
            if(!data) {
                return response.status(404).send({
                    success : false,
                    message : "Greeting not found with id "+request.params.greetingID
                });
            }
            response.send({
                success : true,
                message : "Greeting deleted successfully !",
            });
        });
    }
}

module.exports = new GreetingController();