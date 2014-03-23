module.exports.toBeArray = function toBeArray() {
	return {
		compare: function(actual) {
			return {
				pass: actual instanceof Array
			};
		}
	};
};

module.exports.toBeUrl = function toBeUrl() {
	return {
		compare: function(actual) {
			return {
				pass: /^http:\/\/.+\.jpg$/.test(actual)
			};
		}
	};
};