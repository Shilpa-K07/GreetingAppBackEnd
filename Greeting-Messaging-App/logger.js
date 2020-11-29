const winston = require('winston')
const logger = winston.createLogger({
    format : winston.format.json(),
    transports : [
        new winston.transports.File({level : 'error',filename : 'error.log'}),
        new winston.transports.File({filename : 'generalLogs.log'}),
    ]
});

module.exports = logger;