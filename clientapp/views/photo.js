var _ = require('underscore');
var HumanView = require('human-view');
var templates = require('../templates');
var preloader = require('../helpers/htmlImagePreloader');

var PhotoView = HumanView.extend({
	template: templates.includes.photo,
	srcBindings: {
		'url': '.photo'
	},
	render: function () {
		this.renderAndBind();
	},
	loadPhoto: function(callback) {
		this.renderAndBind();

		var preloadComplete = _.bind(function() { 
			callback($(this.el)); 
		}, this);
		preloader.preload($(this.el).find('img'), preloadComplete);
	}
});

PhotoView.create = function create (model) {
	return new PhotoView({model: model})
};

module.exports = PhotoView;
