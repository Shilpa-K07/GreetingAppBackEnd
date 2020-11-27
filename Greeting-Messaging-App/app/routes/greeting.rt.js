module.exports = (app) => {
    const greetings = require('../controllers/greeting.ctr.js');

    /**
     * @description Create new Greeting
     */
    app.post('/greetings', greetings.create);

    /**
     * @description Retrieve all  Greetings
     */
    app.get('/greetings', greetings.findAll);

    /**
     * @description Retrieve single greeting with greetingID
     */
    app.get('/greetings/:greetingID', greetings.findOne);

    /**
     * @description Update Greeting with greetingID
     */
    app.put('/greetings/:greetingID', greetings.update);

    /**
     * @description Delete Greeting with greetingID
     */
    app.delete('/greetings/:greetingID', greetings.delete);
}