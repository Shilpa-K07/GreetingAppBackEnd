const mongoose = require('mongoose');

const GreetingSchema = mongoose.Schema({
    name : String,
    message : String
}, {
    timestamps : true
});

module.exports = mongoose.model('Greeting', GreetingSchema);