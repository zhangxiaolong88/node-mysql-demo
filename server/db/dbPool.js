/**
 * 管理 数据库连接池
 */

var config = require("../config/dbConfig"),
	dbOperator = require('./dbOperation');

var dbPoolObj = {};

/**
 * 创建 数据库连接池
 * @returns {ConnectionPool}
 */
exports.create = function() {
	dbPoolObj.dbPool = dbOperator.createPool(config.DBConfig);
};

exports.dbPoolObj = dbPoolObj;