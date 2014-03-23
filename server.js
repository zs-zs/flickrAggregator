/*global console*/
var express = require('express');
var helmet = require('helmet');
var Moonboots = require('moonboots');
var config = require('getconfig');
var semiStatic = require('semi-static');
var stylizer = require('stylizer');
var clientTestServer = require('./clientTestServer');
var bundleDefinitions = require('./bundleDefinitions');
var fixPath = require('./helpers').fixPath;
var rebuildTemplates = require('./helpers').rebuildTemplates;
var clientSettingsMiddleware = require('./helpers').clientSettingsMiddleware;
var app = express();

// ------------------
// Start client tests
// ------------------
clientTestServer.start();

// -----------------
// Configure express
// -----------------
app.use(express.compress());
app.use(express.static(fixPath('public')));
// we only want to expose tests in dev
if (config.isDev) {
	app.use(express.static(fixPath('clienttests/assets')));
	app.use(express.static(fixPath('clienttests/spacemonkey')));
}
app.use(express.bodyParser());
app.use(express.cookieParser());
// in order to test this with spacemonkey we need frames
if (!config.isDev) {
	app.use(helmet.xframe());
}
app.use(helmet.iexss());
app.use(helmet.contentTypeOptions());
app.set('view engine', 'jade');

// ---------------------------------------------------
// Configure Moonboots to serve our client application
// ---------------------------------------------------
var clientApp = new Moonboots({
	jsFileName: 'flickr-images',
	cssFileName: 'flickr-images',
	main: fixPath('clientapp/app.js'),
	developmentMode: config.isDev,
	libraries: bundleDefinitions.libraries,
	stylesheets: bundleDefinitions.stylesheets,
	browserify: {
		debug: false
	},
	server: app,
	beforeBuildJS: rebuildTemplates,
	beforeBuildCSS: function (done) {
		// This re-builds css from stylus each time the app's main
		// css file is requested. Which means you can seamlessly change stylus files
		// and see new styles on refresh.
		if (config.isDev) {
			stylizer({
				infile: fixPath('public/css/app.styl'),
				outfile: fixPath('public/css/app.css'),
				development: true
			}, done);
		}
	}
});

var api = require('./flickrApi');
app.get('/api/photos', api.get);

// Enable the functional test site in development
if (config.isDev) {
	app.get('/test*', semiStatic({
		folderPath: fixPath('clienttests'),
		root: '/test'
	}));
}

// configure our main route that will serve our moonboots app
app.get('*', clientSettingsMiddleware, clientApp.html());

// listen for incoming http requests on the port as specified in our config
app.listen(config.http.port);
console.log("Flickr Images is running at: http://localhost:" + config.http.port);
