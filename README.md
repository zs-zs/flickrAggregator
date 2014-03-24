# Flickr Images

Sample application using the Flickr API.

## How to run

1. download/install [node.js](http://nodejs.org/)
1. install dependencies: `npm i`
1. run it: `node server.js`
1. application runs under http://localhost:3000

## How to run the tests

1. start the server: `node server.js`
1. you can run the *client tests* on different browsers by opening http://localhost:4242
1. you can run the *automated QA checklist* on different browsers by opening: http://localhost:3000/test
1. you can run the tests for the server API: 
    - you have to install `jasmine-node` first with `npm install jasmine-node -g` 
    - now you can run the tests with `jasmine-node spec`
