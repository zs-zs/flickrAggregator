var path = require('path');
var config = require('getconfig');
var templatizer = require('templatizer');

var helpers = {
	fixPath: function fixPath (pathString) {
		// a little helper for fixing paths for various enviroments
		return path.resolve(path.normalize(pathString));
	},
	rebuildTemplates: function rebuildTemplates () {
		if (config.isDev) {
			templatizer(helpers.fixPath('clienttemplates'), helpers.fixPath('clientapp/templates.js'));
		}
	},
	clientSettingsMiddleware: function clientSettingsMiddleware (req, res, next) {
		// use a cookie to send config items to client
		res.cookie('config', JSON.stringify(config.client));
		next();
	}
};

module.exports = helpers;