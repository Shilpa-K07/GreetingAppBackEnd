const mongoose = require('mongoose');

const GreetingSchema = mongoose.Schema({
    name : String,
    message : String
}, {
    timestamps : true
},{
    versionKey: true
});
const Greeting = mongoose.model('Greeting', GreetingSchema);

class GreetingModel {
create = (greetingData, callBack) =>{
        const greeting = new Greeting({
            name : greetingData.name,
            message : greetingData.message || "Empty Message"
        });

        greeting.save({}, (error, data) => {
            if(error)
                return callBack(error, null);
            else
                return callBack(null, data);
    });
} 

findAll = (callBack) =>{
    Greeting.find({}, (error, data) => {
        if(error)
            return callBack(error, null);
        return callBack(null, data);
    });
} 

findOne = (greetingData, callBack) => {
    Greeting.findById(greetingData.greetingID, (error, data) => {
        if(error)
            return callBack(error, null);
            return callBack(null, data);
    });
}

update = (greetingData, callBack) => {
    Greeting.findByIdAndUpdate(greetingData.greetingID, {
        name : greetingData.name,
        message : greetingData.message || "Empty Message"
        }, {new: true}, (error, data) => {
            if(error)
                return callBack(error, null);
            return callBack(null, data);
    });
}

deleteById = (greetingData, callBack) => {
    Greeting.findByIdAndRemove(greetingData.greetingID, (error, data) => {
        if(error)
            return callBack(error, null);
        return callBack(null, data);
    });
}
}

module.exports = new GreetingModel();
