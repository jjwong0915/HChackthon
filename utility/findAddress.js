var NodeGeocoder = require('node-geocoder');
var config = require('../config.json');
var geocoder = NodeGeocoder(config.geocoding);

module.exports = geocoder;
// API Doc: http://nchaulet.github.io/node-geocoder/
