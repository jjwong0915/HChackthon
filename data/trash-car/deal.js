let fs = require('fs');
var res = require('./trashCarPatrolData.json');
var data = [];

for (var i of res) {
    if(i.lat=="") continue;
    var tmpdata = {carNumber: i.carNumber, oder: i.oder};
    data.push({lat: parseFloat(i.lat), lng: parseFloat(i.lng), data: tmpdata});
}

console.log(data)

fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
