let camera = require('../data/camera/camera.json');

const get = (add) => {
var data = [];
    var roadb = add.search(/[市|區].*[路|街]/) + 1;
    var roadd = add.search(/[路|街]/) + 1;
    const road = add.substring(roadb, roadd);
    for (const item of camera) {
        if(item["攝影機地點 "].search(road)!=-1){
            data.push({no: item["編號"], position: item['攝影機地點 ']});
        }
    }
    return data;
}

module.exports = get;
