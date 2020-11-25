const mongoose = require('mongoose');

const GreetingSchema = mongoose.Schema({
    name : String,
    message : String
}, {
    timestamps : true
});
const Greeting = mongoose.model('Greeting', GreetingSchema);

class GreetingModel {
create = (req, callBack) =>{
        const greeting = new Greeting({
            name: req.body.name,
            message:req.body.message || "Empty Message"
        });

        greeting.save({}, function(error, data){
        return callBack(error, data);
    });
} 

findAll = (req, callBack) =>{
    Greeting.find({}, function(error, data){
        return callBack(error, data);
    });
} 

findOne = (req, callBack) => {
    Greeting.findById(req.params.greetingID, function(error, data){
        return callBack(error, data);
    });
}

update = (req, callBack) => {
    Greeting.findByIdAndUpdate(req.params.greetingID, {
        name : req.body.name,
        message : req.body.message || "Empty Message"
        }, {new: true}, function(error, data) {
        return callBack(error, data);
    });
}

deleteById = (req, callBack) => {
    Greeting.findByIdAndRemove(req.params.greetingID, function(error, data){
        return callBack(error, data);
    });
}

}

module.exports = new GreetingModel();
