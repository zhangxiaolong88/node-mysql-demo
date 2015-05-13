/**
 * 说明：数据库操作类，提供增删查改方法
 */

var mysql = require('mysql'),
    log = require('../util/logger').logger('dbOperation'),
    errorLog = require('../util/logger').logger('errorLog'),
    sqlParameterOperation = require('./sqlParameterOperation');

/**
 * 获得数据库连接池
 * @param poolConfig
 * @param connectionConfig
 * @returns {ConnectionPool}
 */
function createPool(poolConfig, connectionConfig) {
    var pool = mysql.createPool(poolConfig);
    return pool;
}

/**
 * 格式化sql语句，用参数列表替换掉？
 * @param sql
 * @param paras
 * @returns {String} 格式化后的sql语句
 */
function formatSql(sql, paras) {
    var tempSql = sql;
    for (var i = 0; i < paras.length; i++) {
        var param = paras[i];
        if(typeof param === "object"){
            param = param.sortName + " " + param.sortDesc;
        }
        tempSql = tempSql.replace('?', param);
    }
    return tempSql;
}

/**
 *  查询
 * @param dbPool            DB连接池
 * @param sql               SQL脚本  参数用?代替  {string}
 * @param params            脚本查询参数
 * @param callback          回调函数
 * @param dataFormat        数据格式
 */
function query(dbPool, sql, params, callback, dataFormat) {
    var sqlStr = sql;
    if (arguments.length === 3) {
        callback = arguments[2];
        params = null;
    } else if (arguments.length == 4) {
        if(Array.isArray(arguments[2])) {
            sqlStr = formatSql(sqlStr, params);
            callback = arguments[3];
        } else {
            callback = arguments[2];
            dataFormat = arguments[3];
            params = null;
        }
    } else if(arguments.length == 5) {
        sqlStr = formatSql(sqlStr, params);
    }
    if (!callback || typeof(callback) !== 'function') {
        throw new Error('dbOperation,js: 必须传入回调函数');
    }
    console.log(sqlStr);
    var data = [];
    dbPool.getConnection(function(err, conn) {
        if (err) {
            log.error(err);
            errorLog.error(err);
            callback(err, null);
        } else {
            var request = conn.query(sqlStr, function(err, rows) {
                if (err) {
                    var source = typeof sql === 'string' ? '' : sql.dataView + ' ' + sql.command;
                    log.error('数据库脚本: ' + source);
                    log.error(err);
                    conn.release();
                    callback(err, null);
                } else {
                    conn.release();
                    if (dataFormat) {
                        rows = dataFormat(rows);
                    }
                    rows.forEach(function(row) {
                        for (var key in row) {
                            if (row === "NULL") {
                                row = "";
                            }
                        }
                    });
                    callback(null, rows);
                }
            });
        }
    });
}

exports.query = query;
exports.createPool = createPool;