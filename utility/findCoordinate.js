'use strict';

const NodeGeocoder = require('node-geocoder');
const config = require('../config.json');

const geocoder = NodeGeocoder(config.geocoding);

const findCoordinate = (address) => {
	return geocoder.geocode(address)
	.then((res) => {
		if(res.length < 1) {
			throw new Error("Geocoding API has no result for the address.");
		} else {
			return {
				lat: res[0].latitude,
				lng: res[0].longitude
			};
		}
	});
};

module.exports = findCoordinate;
