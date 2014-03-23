module.exports.preload = function preload (img, callback) {
	// if the image is already loaded (cached)
	if (img.complete || img.readyState === 4)
		return callback(img);

	$(img).load(function (response, status) {
		if (status != 'error')
			return callback(img);

		console.log('image could not be loaded');
	});
};
