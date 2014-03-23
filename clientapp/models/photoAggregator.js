var HumanModel = require('human-model');
var PhotoList = require('../models/photoList');

module.exports = HumanModel.define({
	props: {
		queryString: ['string', true, ''] 
	},
	collections: {
		photos: PhotoList
	},
	search: function () {
		this.photos.fetch({
			reset: true,
			data: {queryString: this.queryString}
		});
	}
});
