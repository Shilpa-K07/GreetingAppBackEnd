const Greeting = require('../models/greeting.mdl.js');

class GreetingService {
    /**
     * @description Create and save greeting then send response to controller
     * @method save is used to save the greeting
     * @param callBack is the callBack for controller
     */
    create = (greetingData, callBack) => {
        // create a greeting
         Greeting.create(greetingData, (error, data) => {
            if(error)
                return callBack(error, null);
            return callBack(null, data);
         })
    }

    /**
     * @description Find all the greetings and return response to controller
     * @method find is used to retrieve greetings
     * @param callBack is the callBack for controller
     */
    findAll = (callBack) => {
            Greeting.findAll((error, data) => {
                if(error)
                    return callBack(error, null);
                return callBack(null, data);
         });
    }

    /**
     * @description Find greeting by id and return response to controller
     * @method findById is used to retrieve greeting by ID
     * @param callBack is the callBack for controller
     */
    findOne = (greetingData, callBack) => {
        Greeting.findOne(greetingData, (error, data) => {
            if(error)
                return callBack(error, null);
            return callBack(null, data);
        });
    }

    /**
     * @description Update greeting by id and return response to controller
     * @method findByIdAndUpdate is used to update greeting by ID
     * @param callBack is the callBack for controller
     */
    update = (greetingData, callBack) => {
        Greeting.update(greetingData, (error, data) => {
            if(error)
                return callBack(error, null);
            return callBack(null, data);
        });
    }

    /**
     * @description Delete greeting by id and return response to controller
     * @method findByIdAndRemove is used to remove greeting by ID
     * @param callBack is the callBack for controller
     */
    delete = (greetingData, callBack) => {
        Greeting.deleteById(greetingData, (error, data) => {
            if(error)
                return callBack(error, null);
            return callBack(null, data);
        });
    }
}

module.exports = new GreetingService();