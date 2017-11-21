var cross = require('./raw_cross.json');
cross = cross.CROSSING.NODE;
data = [];
for (var i of cross) {
    if(i.POS!='NULL'){
        var tmp = i.POS.split(",");
        delete i['POS'];
        tmp = [parseFloat(tmp[0]), parseFloat(tmp[1])]
        tmp.push(i);
        data.push();
    }
}
module.export = data;
