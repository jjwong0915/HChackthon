let speed = require('./speed.json');
let fs = require('fs');
data = [];
for (const item of speed) {
    data.push({lat: parseFloat(item["緯度"]), lng: parseFloat(item["經度"]), data: {position: item["地 點"], limit: item["速限"]}});
}


fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
