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