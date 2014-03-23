var Backbone = require('backbone');
var Photo = require('./photo');

module.exports = Backbone.Collection.extend({
	model: Photo,
	url: '/api/photos'
});
