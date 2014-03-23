var config = require('../dev_config.json');
var request = require('request');

module.exports = function (relativeUrl, callback) {
	request(config.client.apiUrl + relativeUrl, callback);
};
