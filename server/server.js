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
var refuge = require('../data/refuge/data.json');
var incinerator = require('../data/incinerator/data.json');
var firstAid = require('../data/firstAidHospital/data.json');
var kindergarden = require('../data/kindergarden/Data.json');


app.set('views', path.join(__dirname, '../client/template'));
app.set('view engine', 'html');
app.engine('html', cons.hogan);
app.use(express.static(path.join(__dirname, '../client/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index', { title: 'HC hackthon' });
});

app.post('/', (req, res) => {
    var address = req.body.address;
    Promise.all([
        findCoordinate(address),
        uv()
    ])
        .then((result) => {
            if(result[0]=="jizzed"){
                res.send("jizzes");
            }
            else{
                const coor = result[0];
                const uvi = result[1];

                const medResult = search(coor, med, 1);
                const trashResult = uniqueTrash(search(coor, trash, 0.5));
                const bdxResult = search(coor, bdx, 5);
                const poluResult = search(coor, polution, 1);
                const cameraResult = { data: camera(address) };
                const ubikeResult = search(coor, ubike, 0.5);
                const speedResult = search(coor, speed, 1);
                const refugeResult = search(coor, refuge, 1);
                const incineratorResult = search(coor, incinerator, 5);
                const firstAidResult = search(coor, firstAid, 5);
                const kindergardenResult = search(coor, kindergarden, 1);

                const medNum = medResult.length;
                const trashNum = trashResult.length;
                const bdxNum = bdxResult.length;
                const poluNum = poluResult.length;
                const cameraNum = cameraResult.length;
                const ubikeNum = ubikeResult.length;
                const speedNum = speedResult.length;
                const refugeNum = refugeResult.length;

                var Env = bdxNum + poluNum;
                var Safe = refugeNum + medNum + cameraNum + speedNum;
                var Con = ubikeNum + trashNum;
                var scores = {environment: -Env, safety: Safe, convenience: Con};
                

                res.render('result', {
                    target: {
                        address: address,
                        coordinate: coor,
                        uvi: uvi
                    },
                    data: {
                        score: scores,
                        medical: medResult,
                        trash: trashResult,
                        bdx: bdxResult,
                        polution: poluResult,
                        camera: cameraResult,
                        ubike: ubikeResult,
                        speed: speedResult,
                        refuge: refugeResult,
                        incinerator: incineratorResult,
                        firstAid: firstAidResult,
                        kindergarden: kindergardenResult
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
});


app.listen(3000, () => {
    console.log('Server has been started!');
});
