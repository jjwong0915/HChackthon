'use strict';

let path = require('path');
let express = require('express');
let cons = require('consolidate');

let app = express();
let bodyParser = require('body-parser');
let findCoordinate = require('../utility/findCoordinate.js');
let search = require('../utility/search.js');

let uniqueTrash = require('../server/unique-trash.js');

var med = require('../data/medical/data.json');
var trash = require('../data/trash-car/data.json');
var bdx = require('../data/eletronic-device/data.json');
var camera = require('../utility/camera.js');
var uv = require('../utility/uv.js');
var polution = require('../data/polu/data.json');
var ubike = require('../data/ubike/Data.json');
var speed = require('../data/speed/data.json');

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
        findCoordinate(address),
        uv()
    ])
    .then((result) => {
        const coor = result[0];
        const uvi = result[1];

        const medResult = search(coor, med, 1);
        const trashResult = uniqueTrash(search(coor, trash, 0.5));
        const bdxResult = search(coor, bdx, 5);
        const poluResult = search(coor, polution, 1);
        const cameraResult = {data: camera(address)};
        const ubikeResult = search(coor, ubike, 0.5);
        const speedResult = search(coor, speed, 1);

        res.render('result', {
            target: {
                address: address,
                coordinate: coor,
                uvi: uvi
            },
            data: {
                medical: medResult,
                trash: trashResult,
                bdx: bdxResult,
                polution: poluResult,
                camera: cameraResult,
                ubike: ubikeResult,
                speed: speedResult
            }
        });
    })
    .catch((err) => {
        console.log(err);
    });
});


app.listen(3000, () => {
	console.log('Server has been started!');
});
