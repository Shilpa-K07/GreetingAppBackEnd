const Greeting = require('../models/greeting.mdl.js');

class GreetingService {
    /**
     * @description Create and save greeting then send response to controller
     * @method save is used to save the greeting
     * @param callBack is the callBack for controller
     */
    create = (request, callBack) => {
        // create a greeting
         Greeting.create(request, function(error, data){
             return callBack(error, data);
         })
    }

    /**
     * @description Find all the greetings and return response to controller
     * @method find is used to retrieve greetings
     * @param callBack is the callBack for controller
     */
    findAll = (request, callBack) => {
            Greeting.findAll(request, function(error, data){
             return callBack(error, data);
         });
    }

    /**
     * @description Find greeting by id and return response to controller
     * @method findById is used to retrieve greeting by ID
     * @param callBack is the callBack for controller
     */
    findOne = (request, callBack) => {
        Greeting.findOne(request, function(error, data){
            return callBack(error, data);
        });
    }

    /**
     * @description Update greeting by id and return response to controller
     * @method findByIdAndUpdate is used to update greeting by ID
     * @param callBack is the callBack for controller
     */
    update = (request, callBack) => {
        Greeting.update(request, function(error, data){
            return callBack(error, data);
        });
    }

    /**
     * @description Delete greeting by id and return response to controller
     * @method findByIdAndRemove is used to remove greeting by ID
     * @param callBack is the callBack for controller
     */
    delete = (request, callBack) => {
        Greeting.deleteById(request, function(error, data){
            return callBack(error, data);
        });
    }
}

module.exports = new GreetingService();