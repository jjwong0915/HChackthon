'use strict';

const disCalc = (latA, lngA, latB, lngB) => {
    const kmPerLat = 110.75;
    const kmPerLng = 101.75;

    const latDiff = (latA-latB)*kmPerLat;
    const lngDiff = (lngA-lngB)*kmPerLat;

	return Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lngDiff, 2));
};

// search(
//     coordinate:{lat:Number, lng:Number}, 
//     data:[{lat:Number, lng:Number}], 
//     distance:Number
// ):[Object]
// calculate how many items are around the coordinate in the distance(km)
const search = (coordinate, data, distance) => {
    let result = [];
    
    for(const item of data) {
        if(disCalc(coordinate.lat, coordinate.lng, item.lat, item.lng) <= distance) {
            result.push(item.data);
        }
    }
    return result;
};

module.exports = search;
