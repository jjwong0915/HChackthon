'use strict';

let path = require('path');
let express = require('express');
let cons = require('consolidate');

let app = express();
let bodyParser = require('body-parser');
let findCoordinate = require('../utility/findCoordinate.js');
let search = require('../utility/search.js');

var med = require('../data/medical/data.json');
var trash = require('../data/trash-car/data.json');
var bdx = require('../data/eletronic-device/data.json');

app.set('views', path.join(__dirname, '../client/template'));
app.set('view engine', 'html');
app.engine('html', cons.hogan);
app.use(express.static(path.join(__dirname, '../client/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.render('index', {title: 'HC hackthon'});
});

app.post('/', (req, res) => {
    var address = req.body.address;
    findCoordinate(address)
    .then((coor) => {
        const medResult = search(coor, med, 1);
        const trashResult = search(coor, trash, 0.5);
        const bdxResult = search(coor, bdx, 5);

        var trashset = new Set();
        for (const item of trashResult) {
            if(item.carNumber!=""&&item.order!=""){
                var tmp = item.carNumber + " " + item.order;
                trashset.add(tmp);
            }
        }

        res.render('result', {address: address,
            mednum: medResult.length, med: medResult,
            trashnum: trashset.size, trash: Array.from(trashset),
            bdxnum: bdxResult.length, bdx: bdxResult
        });
    })
    .catch((err) => {
        console.log(err);
    });
});


app.listen(3000, () => {
	console.log('Server has been started!');
});
