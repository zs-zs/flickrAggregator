var fixPath = require('./helpers').fixPath;

module.exports = {
	libraries: [
		fixPath('clientapp/libraries/jquery.js'),
		fixPath('clientapp/libraries/isotope.js'),
		fixPath('clientapp/libraries/imagesloaded.js')
	],
	stylesheets: [
		fixPath('public/css/bootstrap.css'),
		fixPath('public/css/app.css')
	]
};