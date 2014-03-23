var _ = require('underscore');
var url = require('url');
var Flickr = require('node-flickr');
var config = require('getconfig');

var flickr = new Flickr({
	api_key: config.flickr_api_key
});

var getFlickrPhotoUrl = function getFlickrPhotoUrl (flickrPhotoResponse) {
	// Url schema: farm / server / image
	// See: http://www.flickr.com/services/api/misc.urls.html
	return 'http://farm' + flickrPhotoResponse.farm +  '.staticflickr.com/' + 
			flickrPhotoResponse.server + '/' + 
			flickrPhotoResponse.id + '_' + flickrPhotoResponse.secret + '_t.jpg';
};

var createPhoto = function createPhoto (flickrPhotoResponse) {
	return {
		url: getFlickrPhotoUrl(flickrPhotoResponse)
	};
};

exports.get = function (req, res) {
	var queryString = req.query.queryString;
	if(!queryString) {
		res.status(200);
		res.send([]);
		return;
	}
	flickr.get('photos.search', {text: queryString, per_page: 60}, function(result) {    
		res.status(200);
		var photosWithUrls = _.map(result.photos.photo, createPhoto);
		res.send(photosWithUrls);
	});
};