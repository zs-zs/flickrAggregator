var _ = require('underscore');
var HumanView = require('human-view');
var templates = require('../templates');
var PhotoView = require('./photo');

module.exports = HumanView.extend({
	template: templates.includes.photoList,
	initialize: function() {
		this.collection.on('reset', this.onReset, this);
		this.collection.on('request', this.onRequest, this);
		this.insertionQueue = [];
	},
	render: function () {
		this.renderAndBind();
		this.setupIsotopeContainer();
	},
	setupIsotopeContainer: function() {
		this.photoListContainer = $(this.$el.filter('.itemContainer')[0]);
		this.photoListContainer.isotope({
			itemSelector : '.photo-item',
			masonry: {
				columnWidth: 100
			}
		});
	},
	onReset: function(collection, options) {
		var views = _.map(collection.models, PhotoView.create);

		_.each(views, function(view) {
			view.loadPhoto(_.bind(this.insertPhotoWithTimeout, this));
		}, this);
	},
	onRequest: function() {
		this.cancelPendingTimeouts();
		var $viewElements = this.photoListContainer.children();
		this.photoListContainer.isotope('remove', $viewElements);
	},
	insertPhotoWithTimeout: function($photo) {
		// making it random with some delay
		var delay = Math.floor(Math.random()*10000);
		var timer = setTimeout(_.bind(function() {
			this.photoListContainer.isotope('insert', $photo);
		}, this), delay);
		this.insertionQueue.push(timer);
	},
	cancelPendingTimeouts: function() {
		for (var i = this.insertionQueue.length - 1; i >= 0; i--) {
			clearTimeout(this.insertionQueue[i]);
		};
		this.insertionQueue = [];
	}
});
