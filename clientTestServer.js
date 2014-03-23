var express = require('express');
var config = require('getconfig');
var fs = require('fs');
var Moonboots = require('moonboots');
var fixPath = require('./helpers').fixPath;
var bundleDefinitions = require('./bundleDefinitions');
var rebuildTemplates = require('./helpers').rebuildTemplates;
var clientSettingsMiddleware = require('./helpers').clientSettingsMiddleware;

module.exports.start = function start() {
	if(!config.isDev)
		return;

	var app = express();
	var testApp = new Moonboots({
		jsFileName: 'flickr-images',
		main: fixPath('clientapp/spec/client-spec.js'),
		server: app,
		developmentMode: config.isDev,
		libraries:  [
			fixPath('clientapp/spec/lib/jasmine-2.0.0/jasmine.js'),
			fixPath('clientapp/spec/lib/jasmine-2.0.0/jasmine-html.js'),
			fixPath('clientapp/spec/lib/jasmine-2.0.0/boot.js'),
			fixPath('clientapp/spec/lib/sinon-1.9.0.js'),
			fixPath('clientapp/libraries/jquery.js'),
			fixPath('clientapp/libraries/isotope.js'),
			fixPath('clientapp/libraries/imagesloaded.js')
		],
		stylesheets: [
			fixPath('clientapp/spec/lib/jasmine-2.0.0/jasmine.css')
		],
		beforeBuildJS: rebuildTemplates,
		browserify: {
			debug: false
		}
	});
	app.get('*', clientSettingsMiddleware, testApp.html());

	app.listen(config.http.clientTestPort);
	console.log("Client test server is running at: http://localhost:" + config.http.clientTestPort);
};