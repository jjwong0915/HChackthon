var refuge = require('./refuge.json');
let fs = require('fs');

var data = [];
for (const item of refuge) {
    if(item["緯度"]=""||item["經度"]=="") continue;
    data.push({lat: parseFloat(item["緯度"]), lng: parseFloat(item["經度"]), data:{name: item["收容場所名稱"], peopleNumber: item["預估收容人數"], phone: item["聯絡電話"], cellphone: item["手機"], admin: item["管理人"]}});
}


fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
