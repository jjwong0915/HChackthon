const geocoder = require('./findAddress.js');

const disCalc = (latA, lngA, latB, lngB) => (
	Math.sqrt(Math.pow(latA-latB, 2) + Math.pow(lngA-lngB, 2))
);

// search(address:String, data: [{lat:Number, lng:Number}], d:Number):
// calculate how many items are around the address in the distance(degrees)
const search = function(address, data, distance, callback) {
    return geocoder.geocode(address).then((res) => {
        if(res.length < 1) {
            throw new Error("Geocoding API has no result for the address.");
        }

        const lat = res[0].latitude;
        const lng = res[0].longitude;
        
        const result = [];
        for(const item of data) {
            if(disCalc(lat, lng, item.lat, item.lng) < distance) {
                result.push(item.data);
            }
        }

        return result;
    });
};

module.exports = search;
