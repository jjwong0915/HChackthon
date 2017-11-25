'use strict';

const uniqueTrash = (trashRes) => {
	var trashMap = new Map();
	for(const item of trashRes) {
		var carNum = item.data.carNumber;
		if(trashMap.get(carNum) === undefined) {
			trashMap.set(carNum, item);
		} else {
			const trash = trashMap.get(carNum);
			if(item.distance < trash.distance) {
				trashMap.set(carNum, item);
			}
		}
	}
	console.log(trashMap.values());
	return Array.from(trashMap.values());
};

module.exports = uniqueTrash;