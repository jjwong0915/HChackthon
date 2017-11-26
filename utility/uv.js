var rp = require('request-promise');

const uv = () => {
    return rp('http://opendata2.epa.gov.tw/UV/UV.json')
    .then((body) => {
        const data = JSON.parse(body);
        for (const item of data) {
            if(item.County=="新竹縣"){
                return item.UVI;
            }
        }
        throw new Error("HsinChu UV data has not found.");
    });
}

module.exports = uv;
