require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

/**
 * @description create express app
 */
const app = express();

/**
 * @description parse requests of content-type - appliction/json
 */
app.use(bodyParser.json());

/**
 * @description configuring the database
 */
require('./config/database.config.js')();

/**
 * @description require greetings routes
 */
require('./app/routes/greeting.routes.js')(app);

/**
 * @description listen for requests
 */
//var port = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port ",process.env.PORT);
})