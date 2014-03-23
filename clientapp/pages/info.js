var PageView = require('./base');
var templates = require('../templates');

module.exports = PageView.extend({
	pageTitle: 'Info',
	template: templates.pages.info,
	render: function () {
		this.renderAndBind();
	}
});
