const winston = require('winston')
const logger = winston.createLogger({
    format : winston.format.json(),
    transports : [
        new winston.transports.File({level : 'error',filename : './log/error.log'}),
        new winston.transports.File({filename : './log/generalLogs.log'}),
    ]
});

module.exports = logger;