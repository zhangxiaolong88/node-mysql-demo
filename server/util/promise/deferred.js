var Promise = require('./promise');

module.exports = Deferred;

function Deferred() {
    this.promise = new Promise();
}

/**
 * 完成态
 * @param data
 */
Deferred.prototype.resolve = function(data) {
    var handler,
        queue = this.promise.queue;
    while ((handler = queue.shift())) {
        if (handler && handler.fulfilled) {
            var ret = handler.fulfilled(data);
            if (ret && ret.isPromise) {
                ret.queue = queue;
                this.promise = ret;
                return;
            }
        }
    }
};

/**
 * 失败态
 * @param err
 */
Deferred.prototype.reject = function(err) {
    var handler,
        queue = this.promise.queue;
    while ((handler = queue.shift())) {
        if (handler && handler.error) {
            var ret = handler.error(err);
            if (ret && ret.isPromise) {
                ret.queue = queue;
                this.promise = ret;
                return;
            }
        }
    }
};

/**
 * 未完成态
 * @param chunk
 */
Deferred.prototype.progress = function(chunk) {
    var handler,
        queue = this.promise.queue;
    while ((handler = queue.shift())) {
        if (handler && handler.progress) {
            var ret = handler.progress(chunk);
            if (ret && ret.isPromise) {
                ret.queue = queue;
                this.promise = ret;
                return;
            }
        }
    }
};

/**
 * 回调函数
 * @returns {Function}
 */
Deferred.prototype.callback = function() {
    var self = this;
    return function(err, data) {
        if (err) {
            self.reject(err);
        } else {
            self.resolve(data);
        }
    };
};

/**
 * 多异步协作
 * @param promises
 * @returns {*}
 */
Deferred.prototype.all = function(promises) {
    var count = promises.length,
        self = this,
        results = [];
    promises.forEach(function(promise, index) {
        promise.then(function(data) {
            results[index] = data;
            count--;
            if (count === 0) {
                self.resolve(results);
                return;
            }
        }, function(err) {
            self.reject(err);
            return;
        });
    });
    return this.promise;
};