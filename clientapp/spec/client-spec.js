var matchers = require('./matchers');
var Backbone = require('backbone');
var HumanModel = require('human-model');
var HumanView = require('human-view');
var PhotoModel = require('../models/photo');
var PhotoListModel = require('../models/photoList');
var PhotoAggregator = require('../models/PhotoAggregator');

describe('models/Photo', function() {
	it('has an url attribute', function() {
		var photo = new PhotoModel({
			url: 'http://flick.com/image.jpg'
		});
		expect(photo.url).toEqual('http://flick.com/image.jpg');
	});

	it('should throw a TypeError when I set the url to a non-string value', function() {
		var photo = new PhotoModel();
		expect(function() {
			photo.url = 5;
		}).toThrow(new TypeError("Property 'url' must be of type string. Tried to set 5"));
	});
});

describe('models/PhotoList', function() {
	var server;
	beforeEach(function () { 
		server = sinon.fakeServer.create(); 
	});
	afterEach(function () { 
		server.restore(); 
	});

	it('exposes an url to the photos api', function() {
		var photoList = new PhotoListModel();
		expect(photoList.url).toEqual('/api/photos');
	});

	it('is able to fetch the photos from the server', function() {
		var photoList = new PhotoListModel();
		photoList.fetch({
			data: {queryString: 'test'}
		});
		server.requests[0].respond(
			200, 
			{ "Content-Type": "application/json" },
			JSON.stringify([{ url: 'http://flick.com/image.jpg' }])
		);
		expect(photoList.models.length).toEqual(1);
	});
});

describe('models/PhotoAggregator', function() {
	var server;
	beforeEach(function () { 
		server = sinon.fakeServer.create(); 
	});
	afterEach(function () { 
		server.restore(); 
	});

	it('has a queryString attribute', function() {
		var photoAggregator = new PhotoAggregator({
			queryString: 'Free text search'
		});
		expect(photoAggregator.queryString).toEqual('Free text search');
	});

	it('should throw a TypeError when I set the queryString to a non-string value', function() {
		var photoAggregator = new PhotoAggregator();
		expect(function() {
			photoAggregator.queryString = 5;
		}).toThrow(new TypeError("Property 'queryString' must be of type string. Tried to set 5"));
	});

	it('has a photos subcollection', function() {
		var photoAggregator = new PhotoAggregator();
		expect(photoAggregator.photos).toBeDefined();
	});

	it('has a photos subcollection which is initially empty', function() {
		var photoAggregator = new PhotoAggregator();
		expect(photoAggregator.photos.length).toEqual(0);
	});

	it('should fetch its subcollection when I call search()', function() {
		var photoAggregator = new PhotoAggregator({
			queryString: 'test'
		});
		photoAggregator.search();
		server.requests[0].respond(
			200, 
			{ "Content-Type": "application/json" },
			JSON.stringify([{ url: 'http://flick.com/image.jpg' }])
		);
		expect(photoAggregator.photos.models.length).toEqual(1);
	});
});
