/**
 * Created with JetBrains WebStorm.
 * User: xuliang.cai
 * Date: 14-2-18
 * Time: 上午10:27
 * To change this template use File | Settings | File Templates.
 */

var Deferred = require('./deferred');

module.exports = function(fn) {
    return function() {
        var deferred = new Deferred(),
            args = Array.prototype.slice.call(arguments, 0);
        args.push(deferred.callback());
        fn.apply(null, args);
        return deferred.promise;
    };
};