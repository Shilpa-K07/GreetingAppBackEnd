const greetingService = require('../services/greeting.svc.js');
const Joi = require('joi'); 

const inputPattern = Joi.object().keys({
    name : Joi.string().regex(/^[a-zA-Z ]+$/).min(3).required().error(new Error("Name should contain only characters of minimum length 2")),
    message : Joi.string().allow('', null)
})

class GreetingController{
    /**
     * @description Create and save a new greeting
     * @param NAME_PATTERN is used to validate name
     * @param res is used to send the response
     */
    create = (req, res) => {
        const greetingData = { 
            name : req.body.name,
            message : req.body.message
        }

        const greetingResponse = {
        }    

       const validationResult =  inputPattern.validate(greetingData);

       if(validationResult.error){
            return res.status(400).send({
                success : greetingResponse.success = false,
                message: greetingResponse.message =  validationResult.error.message
            });
        }

        greetingService.create(greetingData, (error, data) => {
            if(error){
                
                return res.status(500).send({
                success : greetingResponse.success = false,
                message : greetingResponse.message = "Some error occurred while creating greeting"
                });
            }

            res.send({
                success : greetingResponse.success = true,
                message : greetingResponse.message = "Greeting added successfully !",
                data : greetingResponse.data = data
            });
       });
    }

    /**
     * @description Find all the greeting
     * @method findAll is service class method
     */
    findAll = (req, res) => {
        const greetingResponse = {
        }

        greetingService.findAll((error, data) => {
            if(error){
                return res.status(500).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Some error occurred while retrieving greetings"
                });
            }
            
            res.send({
                success : greetingResponse.success = true,
                message : greetingResponse.message = "Successfully retrieved greetings !",
                data : greetingResponse.data = data
            });
        });
    }
         
    /**
     * @description Find greeting by id
     * @method findOne is service class method
     * @param response is used to send the response
     */
    findOne = (req, res) => {
        const greetingData = {
            greetingID : req.params.greetingID
        }

        const greetingResponse = {
        }

        greetingService.findOne(greetingData, (error, data) => {
            if(error){
                return res.status(500).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Error retrieving note with id "+ greetingData.greetingID
                });
            }
           
            if(!data){
                
                return res.status(404).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Greeing not found with id : "+ greetingData.greetingID
                });
            }

            
            res.send({
                success : greetingResponse.success = true,
                message : greetingResponse.message = "Successfully retrieved greeting with id : "+ greetingData.greetingID,
                data : greetingResponse.data = data
            });
        });
    }
       
    /**
     * @description Update greeting by id
     * @method update is service class method
     * @param res is used to send the response
     */
    update = (req, res) => {
        const greetingData = { 
            name : req.body.name,
            message : req.body.message,
            greetingID : req.params.greetingID
        }

        const greetingResponse = {
        }

        greetingService.update(greetingData, (error, data) => {
            if(error){
                return res.status(500).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Error updating greeting with id : "+ greetingData.greetingID
                });
            }

            if(!data) {
                
                return res.status(404).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Greeting not found with id : "+ greetingData.greetingID
                });
            }

            res.send({
                success : greetingResponse.success = true,
                message : greetingResponse.message =  "Greeting updated successfully !",
                data : greetingResponse.data = data
            });
        });
    }

     /**
     * @description Update greeting with id
     * @method delete is service class method
     * @param response is used to send the response 
     */
    delete(req, res){
        const greetingData = { 
            greetingID : req.params.greetingID
        }

        const greetingResponse = {
        }

        greetingService.delete(greetingData, (error, data) => {
            if(error){
                return res.status(500).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Could not delete greeting with id : "+ greetingData.greetingID
                });
            }

            if(!data) {
                return res.status(404).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Greeting not found with id : "+ greetingData.greetingID
                });
            }

            res.send({
                sucess : greetingResponse.success = true,
                message : greetingResponse.message = "Greeting deleted successfully !"
            });
        });
    }
}

module.exports = new GreetingController();