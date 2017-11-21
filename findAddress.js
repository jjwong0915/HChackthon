var NodeGeocoder = require('node-geocoder');
var config = require('./config.json');
var geocoder = NodeGeocoder(config);
module.exports = geocoder;
