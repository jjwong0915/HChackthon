var fff= require('./data.json');
var fs = require('fs')
data = [];
for(i of fff){
    data.push({lat: i.lat, lng: i.lng, data:{name: i.name}});
}
fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
