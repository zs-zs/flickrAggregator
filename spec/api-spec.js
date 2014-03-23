var request = require('./request');
var matchers = require('./matchers');

describe('api/photos', function() {
	beforeEach(function() {
		this.addMatchers(matchers);
	});

	it('should return an empty photo list given an empty queryString', function(done) {
		request('/api/photos?queryString=', function(error, response, body){			
			expect(response.body).toEqual('[]');
			done();
		});
	});

	it('should return a photo list with urls', function(done) {
		request('/api/photos?queryString=test', function(error, response, body) {
			var photoList = JSON.parse(response.body);
			expect(photoList).toBeArray();
			for (var i = photoList.length - 1; i >= 0; i--) {
				expect(photoList[i].url).toBeDefined();
			};
			done();
		});
	});

	it('should return a photo list with valid urls', function(done) {
		request('/api/photos?queryString=test', function(error, response, body) {
			var photoList = JSON.parse(response.body);
			expect(photoList).toBeArray();
			for (var i = photoList.length - 1; i >= 0; i--) {
				expect(photoList[i].url).toBeUrl();
			};
			done();
		});
	});
});
