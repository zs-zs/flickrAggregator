/*global me, app*/
var Backbone = require('backbone');
var HomePage = require('./pages/home');
var InfoPage = require('./pages/info');

module.exports = Backbone.Router.extend({
	routes: {
		'': 'home',
		'info': 'info'
	},
	// ------- ROUTE HANDLERS ---------
	home: function () {
		this.trigger('newPage', new HomePage());
	},
	info: function () {
		this.trigger('newPage', new InfoPage());
	}
});
