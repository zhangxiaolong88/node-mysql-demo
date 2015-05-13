// 日志处理

var log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'console'
    }, {
        type: 'file',
        absolute: true,
        filename: __dirname + '/../logs/access.log',
        maxLogSize: 1024 * 1024,
        backup: 3
            //            category: 'normal'
    }, {
        type: 'file',
        absolute: true,
        filename: __dirname + '/../logs/error.log',
        maxLogSize: 1024 * 1024,
        backup: 3,
        category: 'errorLog'
    }],
    replaceConsole: true
});

exports.logger = function(name) {
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
};