var geocoder = require('./findAddress.js');
var search = function(address, data){
    var min = 99999999;
    var fdata;
    geocoder.geocode(address, function(err, res){
        if(err) console.log(err);
        else{
            var lat = parseFloat(res[0].latitude);
            var lon = parseFloat(res[0].longitude);
            for(var i of data){
                var tmp = (Math.pow(lat-i.lat, 2) + Math.pow(lon-i.lng, 2));
                if(tmp<min){
                    min = tmp;
                    fdata = i.data;
                }
            }
        }
        console.log("最近的", fdata);
    });
    return fdata;
}
module.exports = search;
