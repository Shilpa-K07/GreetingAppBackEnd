const mongoose = require('mongoose');

const GreetingSchema = mongoose.Schema({
    name : String,
    message : String
}, {
    timestamps : true
});
const Greeting = mongoose.model('Greeting', GreetingSchema);

class GreetingModel {
create = (request, callBack) =>{
        const greeting = new Greeting({
            name : request.name,
            message : request.message || "Empty Message"
        });

        greeting.save({}, (error, data) => {
        return callBack(error, data);
    });
} 

findAll = (callBack) =>{
    Greeting.find({}, (error, data) => {
        return callBack(error, data);
    });
} 

findOne = (request, callBack) => {
    Greeting.findById(request.greetingID, (error, data) => {
        return callBack(error, data);
    });
}

update = (request, callBack) => {
    Greeting.findByIdAndUpdate(request.greetingID, {
        name : request.name,
        message : request.message || "Empty Message"
        }, {new: true}, (error, data) => {
        return callBack(error, data);
    });
}

deleteById = (request, callBack) => {
    Greeting.findByIdAndRemove(request.greetingID, (error, data) => {
        return callBack(error, data);
    });
}
}

module.exports = new GreetingModel();
