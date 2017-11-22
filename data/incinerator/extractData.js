'use strict';

const fs = require('fs');
const rowData = require('./rawData.json');

let data = [];
for(const feature of rowData.features) {
	let latSum = 0;
	let lngSum = 0;
	for(const coordinate of feature.geometry.coordinates[0]) {
		latSum += coordinate[1];
		lngSum += coordinate[0];
	}
	const coordinateCount = feature.geometry.coordinates[0].length;
	data.push({
		lat: latSum/coordinateCount,
		lng: lngSum/coordinateCount,
		data: {
			name: feature.properties.name
		}
	});
}

fs.writeFile('data.json', JSON.stringify(data), (err) => {
	if(err) throw err;
	else console.log('finished!');
});