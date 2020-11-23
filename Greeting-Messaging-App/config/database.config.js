module.exports = () =>  {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser : true
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log("Could not connect to the database. Exiting now..", err);
        process.exit();
    })
}