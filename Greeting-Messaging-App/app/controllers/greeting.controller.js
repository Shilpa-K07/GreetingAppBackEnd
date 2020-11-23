const greetingService = require('../services/greeting.service.js');
class GreetingController{

    /**
     * @description Create and save a new greeting
     */
    create(req, res){
         if(!req.body.name){
            return res.status(400).send({
                message : "Greeting name can not be empty"
            });
        }

        greetingService.create(req)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating greeting"
            })
        })
    }      

    /**
     * @description Find all the greeting 
     */
    findAll(req, res) {
        greetingService.findAll()
        .then(greetings => {
            res.send(greetings);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving greetings"
            })
        })
    }

    /**
     * @description Find greeting by id
     */
    findOne(req, res){
        greetingService.findOne(req)
        .then(greeting => {
            if(!greeting) {
                return res.status(404).send({
                    message: "Greeing not found with id" +req.params.greetingID
                });
            }
            res.send(greeting);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving note with id " + req.params.greetingID
            });
        });
    };

    /**
     * @description Update greeting by id
     */
    update(req, res){
        greetingService.update(req)
        .then(greeting => {
            if(!greeting){
                return res.status(404).send({
                    message: "Greeting not found with id "+req.params.greetingID
                });
            }
            res.send(greeting);
        }).catch(err => {
            return res.status(500).send({
                message: "Error updating greeting with id "+req.params.greetingID
            });
        });
    }

     /**
     * @description Update greeting with id
     */
    delete(req, res){
       greetingService.delete(req)
        .then(greeting => {
            if(!greeting) {
                return res.status(404).send({
                    message: "Greeting not found with id "+req.params.greetingID
                });
            }
            res.send({
                message: "Greeting deleted successfully !"
            });
        }).catch(err => {
            return res.status(500).ssend({
                message: "Could not delete greeting with id "+req.params.greetingID
            });
        });
    }
}

module.exports = new GreetingController();