/**
 * Created with JetBrains WebStorm.
 * User: xuliang.cai
 * Date: 14-2-17
 * Time: 下午6:39
 * To change this template use File | Settings | File Templates.
 */

module.exports = Promise;

function Promise() {
    this.isPromise = true;
    this.queue = [];
}

Promise.prototype.then = function(fulfilledHandler, errorHandler, progressHandler) {
    var handler = {};
    if('function' === typeof fulfilledHandler) {
        handler.fulfilled = fulfilledHandler;
    }
    if('function' === typeof errorHandler) {
        handler.error = errorHandler;
    }
    if('function' === typeof progressHandler) {
        handler.progress = progressHandler;
    }
    this.queue.push(handler);
    return this;
};