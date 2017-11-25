var rp = require('request-promise');

const r = (res) => {
    return rp(res)
    .then(function (htmlString) {
        htmlString = JSON.parse(htmlString);
        for (const item of htmlString) {
            if(item.County=="新竹縣"){
                return item.UVI;
            }
        }
        return htmlString;
    })
    .catch(function (err) {
        console.log(err);
    });
}
module.exports = r;
