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