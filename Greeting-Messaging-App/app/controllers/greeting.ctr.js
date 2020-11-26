const greetingService = require('../services/greeting.svc.js');
const Joi = require('joi'); 

const inputPattern = Joi.object().keys({
    name : Joi.string().regex(/^[a-zA-Z ]+$/).min(3).required(),
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
            success : null,
            message : null,
            data : null
        }    

        const validationResult = inputPattern.validate(greetingData); 

        if(validationResult.error){
            greetingResponse.success = false;
            greetingResponse.message =  "Name should contain only characters of minimum length 2";
            return res.status(400).send({
                greetingResponse
            });
        }

        greetingService.create(greetingData, (error, data) => {
            if(error){
                greetingResponse.success = false
                greetingResponse.message = "Some error occurred while creating greeting"
                return res.status(500).send({
                greetingResponse
                });
            }
            
            greetingResponse.success = true
            greetingResponse.message = "Greeting added successfully !"
            greetingResponse.data = data
            res.send({
                greetingResponse
            });
       });
    }

    /**
     * @description Find all the greeting
     * @method findAll is service class method
     */
    findAll = (req, res) => {
        const greetingResponse = {
            success : null,
            message : null
        }

        greetingService.findAll((error, data) => {
            if(error){
                greetingResponse.success = false
                greetingResponse.message = "Some error occurred while retrieving greetings"
                return res.status(500).send({
                   greetingResponse
                });
            }

            greetingResponse.success = true
            greetingResponse.message = "Successfully retrieved greetings !"
            greetingResponse.data = data
            res.send({
                greetingResponse
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
            success : null,
            message : null
        }

        greetingService.findOne(greetingData, (error, data) => {
            if(error){
                greetingResponse.success = false
                greetingResponse.message = "Error retrieving note with id "+ greetingData.greetingID
                return res.status(500).send({
                   greetingResponse
                });
            }
           
            if(!data){
                greetingResponse.success = false
                greetingResponse.message = "Greeing not found with id : "+ greetingData.greetingID
                return res.status(404).send({
                    greetingResponse
                });
            }

            greetingResponse.success = false
            greetingResponse.message = "Successfully retrieved greeting with id : "+ greetingData.greetingID
            greetingResponse.data = data
            res.send({
                greetingResponse
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
            success : null,
            message : null,
            data : null
        }

        greetingService.update(greetingData, (error, data) => {
            if(error){
                greetingResponse.success = false,
                greetingResponse.message = "Error updating greeting with id : "+ greetingData.greetingID
                return res.status(500).send({
                   greetingResponse
                });
            }

            if(!data) {
                greetingResponse.success = false,
                greetingResponse.message = "Greeting not found with id : "+ greetingData.greetingID
                return res.status(404).send({
                    greetingResponse
                });
            }

            greetingResponse.success = true,
            greetingResponse.message =  "Greeting updated successfully !",
            greetingResponse.data = data
            res.send({
                greetingResponse
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
            success : null,
            message : null,
        }

        greetingService.delete(greetingData, (error, data) => {
            if(error){
                greetingResponse.success = false
                greetingResponse.message = "Could not delete greeting with id : "+ greetingData.greetingID
                return res.status(500).send({
                   greetingResponse
                });
            }

            if(!data) {
                greetingResponse.success = false
                greetingResponse.message = "Greeting not found with id : "+ greetingData.greetingID
                return res.status(404).send({
                    greetingResponse
                });
            }

            greetingResponse.success = true
            greetingResponse.message = "Greeting deleted successfully !"
            res.send({
                greetingResponse
            });
        });
    }
}

module.exports = new GreetingController();