const Greeting = require('../models/greeting.model.js');

class GreetingService {
    /**
     * @description Create and save greeting then send response to controller
     */
    create(req) {
        // create a greeting
        const greeting = new Greeting({
            name: req.body.name,
            message:req.body.message || "Empty Message"
        });

        //save greeting in the database
return  greeting.save(        );
    }

    /**
     * @description Find all the greetings and return response to controller
     */
    findAll() {
        return Greeting.find();
    }

    /**
     * @description Find greeting by id and return response to controller
     */
    findOne(req) {
        return Greeting.findById(req.params.greetingID)
    }

    /**
     * @description Update greeting by id and return response to controller
     */
    update(req) {
        return Greeting.findByIdAndUpdate(req.params.greetingID, {
            name : req.body.name,
            message : req.body.message || "Empty Message"
        }, {new: true})
    }

    
    /**
     * @description Delete greeting by id and return response to controller
     */
    delete(req) {
        return Greeting.findByIdAndRemove(req.params.greetingID);
    }
}

module.exports = new GreetingService();