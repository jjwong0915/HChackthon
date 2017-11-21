'use strict';

var fs = require('fs');
var geocoder = require('../../utility/findAddress.js');

var data = require('./medical_institutions.json');

let targetData = [];
for(let i of data) {
	if(i['地址'].search(/新竹/) != -1) {
		targetData.push(i);
	}
}

let promises = [];
for(var j=0;j<targetData.length;j++) {
	setTimeout((ins) => {
		var promise = geocoder.geocode(ins['地址']).then((res) => {
			let results = {
				lat: res[0].latitude,
				lng: res[0].longitude,
				data: {
					name: ins['機構名稱']
				}
			};
			console.log(results);
			return results;
		}).catch((err) => {
			console.error(err);
		});
		promises.push(promise);
	}, 100*j, targetData[j]);
}



setTimeout(() => {
	Promise.all(promises).then((results) => {
		fs.writeFile('data.json', JSON.stringify(results), (err) => {
			if(err) throw err;
			console.log('finished!');
		});
		console.log(results);
	})
}, 100*targetData.length);



