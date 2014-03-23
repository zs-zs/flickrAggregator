/*global app, $*/
var stats = require('loading-stats');
var Backbone = require('backbone');
var _ = require('underscore');
var logger = require('andlog');
var config = require('clientconfig');
var Router = require('./router');
var MainView = require('./views/main');

module.exports = {
	// this is the whole app initter
	blastoff: function () {
		// add the ability to bind/unbind/trigger events
		// to the main app object.
		_.extend(this, Backbone.Events);

		var self = window.app = this;

		// init our URL handlers and the history tracker
		this.router = new Router();
		this.history = Backbone.history;

		// wait for document ready to render our main view
		// this ensures the document has a body, etc.
		$(function () {
			// init our main view
			var mainView = self.view = new MainView({
				el: document.body
			});

			// ...and render it
			mainView.render();

			// listen for new pages from the router
			self.router.on('newPage', mainView.setPage, mainView);

			// we have what we need, we can now start our router and show the appropriate page
			self.history.start({pushState: true, root: '/'});
		});
	},

	// This is how you navigate around the app.
	// this gets called by a global click handler that handles
	// all the <a> tags in the app.
	// it expects a url without a leading slash.
	// for example: "costello/settings".
	navigate: function (page) {
		var url = (page.charAt(0) === '/') ? page.slice(1) : page;
		this.history.navigate(url, {trigger: true});
	}
};

module.exports.blastoff();
