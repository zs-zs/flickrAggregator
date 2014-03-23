var PageView = require('./base');
var templates = require('../templates');
var PhotoAggregatorView = require('../views/photoAggregator');
var PhotoAggregatorModel = require('../models/photoAggregator');

module.exports = PageView.extend({
	pageTitle: 'Home',
	template: templates.pages.home,
	render: function () {
		this.renderAndBind();
		new PhotoAggregatorView({
			el: this.$('.photoAggregator'),
			model: new PhotoAggregatorModel()
		}).render();
	}
});
