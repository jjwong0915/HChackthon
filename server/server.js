'use strict';

let path = require('path');
let express = require('express');
let cons = require('consolidate');

let app = express();
let bodyParser = require('body-parser');
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
    Promise.all([
        search(address, med, 0.01),
        search(address, trash, 0.01),
        search(address, bdx, 1)
    ])
    .then((result) => {
        var trashset = new Set();
        for (const item of result[1]) {
            if(item.carNumber!=""&&item.order!=""){
                var tmp = item.carNumber + " " + item.order;
                trashset.add(tmp);
            }
        }
        res.render('result', {address: address,
            mednum: result[0].length, med: result[0],
            trashnum: trashset.size, trash: Array.from(trashset),
            bdxnum: result[2].length, bdx: result[2]
        });
    })
    .catch((err) => {
        console.log(err);
    });
});


app.listen(3000, () => {
	console.log('Server has been started!');
});
