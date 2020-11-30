const greetingService = require('../services/greeting.svc.js');
const Joi = require('joi'); 
const logger = require('../../logger.js')

const inputPattern = Joi.object({
    name : Joi.string().regex(/^[a-zA-Z ]+$/).min(3).required().messages({
        'string.pattern.base': 'name should contain only characters.',
        'string.min': 'name must have minimum 2 characters.',
        'string.empty': 'name can not be empty',
      }),
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
                logger.error("Some error occurred while creating greeting")
                return res.status(500).send({
                success : greetingResponse.success = false,
                message : greetingResponse.message = "Some error occurred while creating greeting"
                });
            }

            logger.info("Greeting added successfully !")
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
                logger.error("Some error occurred while retrieving greetings");
                return res.status(500).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Some error occurred while retrieving greetings"
                });
            }
            
            logger.info("Successfully retrieved greetings !");
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
                logger.error("Error retrieving note with id "+ greetingData.greetingID)
                return res.status(500).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Error retrieving note with id "+ greetingData.greetingID
                });
            }
           
            if(!data){
                logger.warn("Greeing not found with id : "+ greetingData.greetingID)
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
                logger.error("Error updating greeting with id : "+ greetingData.greetingID)
                return res.status(500).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Error updating greeting with id : "+ greetingData.greetingID
                });
            }

            if(!data) {
                logger.warn("Greeting not found with id : "+ greetingData.greetingID)
                return res.status(404).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Greeting not found with id : "+ greetingData.greetingID
                });
            }

            logger.info("Greeting updated successfully !")
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
                logger.error("Could not delete greeting with id : "+ greetingData.greetingID)
                return res.status(500).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Could not delete greeting with id : "+ greetingData.greetingID
                });
            }

            if(!data) {
                logger.warn("Greeting not found with id : "+ greetingData.greetingID);
                return res.status(404).send({
                    success : greetingResponse.success = false,
                    message : greetingResponse.message = "Greeting not found with id : "+ greetingData.greetingID
                });
            }

            logger.info("Greeting deleted successfully !")
            res.send({
                sucess : greetingResponse.success = true,
                message : greetingResponse.message = "Greeting deleted successfully !"
            });
        });
    }
}

module.exports = new GreetingController();