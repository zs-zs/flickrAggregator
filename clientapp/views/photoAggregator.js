var HumanView = require('human-view');
var templates = require('../templates');
var PhotoListView = require('./photoList');

module.exports = HumanView.extend({
	template: templates.includes.photoAggregator,
	inputBindings: {
		'queryString': '.search-box'
	},
	events: {
		'click .search-btn': 'search',
		'blur .search-box': 'updateModel'
	},
	render: function () {
		this.renderAndBind();
		this.ensurePhotoListView();
		this.photoListView.render();
	},
	search: function (e) {
		e.preventDefault();
		this.model.search();
	},
	updateModel: function () {
		this.model.queryString = this.$('.search-box').val();
	},
	ensurePhotoListView: function () {
		if(this.photoListView)
			return;
		this.photoListView = new PhotoListView({
			el: this.$('.aggregatedPhotos'),
			collection: this.model.photos
		}); 	
	}
});
