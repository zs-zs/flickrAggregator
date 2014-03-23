/*global monkey test*/

// these tests assume you've loaded the default fixture
monkey.loadApp('/', {
	height: 500,
	width: 970,
	bugUrl: 'https://github.com/henrikjoreteg/humanjs-sample-app/issues/new'
});

test('navigation', function () {
	monkey
		.log('starting')
		.waitForVisible('#pages .page')
		.goToPage('/')
		.confirm('Home page is visible')
		.confirm('The "Home" nav tab is active')
		.goToPage('/info')
		.confirm('Info page is visible')
		.destroy();
});

test('searching Flickr images', function () {
	monkey
		.log('starting')
		.goToPage('/')
		.waitForVisible('#pages .page')
		.confirm('Search box is visible')
		.instruct('We will search for "flickr". Please ensure', [
			'the correct images are shown',
			'the images are showing up with animation'
		])
		.setValue('input.search-box', 'flickr')
		.click('input.search-btn')
		.confirm('Do you see the correct images?')
		.confirm('Animation looks good?')
		.destroy();
});
