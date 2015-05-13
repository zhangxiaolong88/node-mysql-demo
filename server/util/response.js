// 返回数据给客户端
var accessLog = require('./logger').logger('response'),
    errorLog = require('./logger').logger('error');

/**
 * 查询数据返回
 * @param obj { res(response对象), data(object,数据对象), info(string,日志说明) }
 * @returns {Function}
 */
exports.send = function(res, data, info) {
    // 返回数据
    res.set('Content-Type', 'application/json; charset=UTF-8');
    res.send(data);

    // 打印日志
    if (!!info) {
        if (data.state === 1) {
            accessLog.info(info);
        } else {
            errorLog.error(info);
        }
    }
};