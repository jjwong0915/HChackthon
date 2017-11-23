'use strict';

let path = require('path');
let express = require('express');
let cons = require('consolidate');

let app = express();
let bodyParser = require('body-parser');
let search = require('../utility/search.js');
var med = require('../data/medical/data.json');

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
    var tmp = search(address, med, 0.01, function(result){
    	res.render('result', {mednum: result.length, med: result});
    });
});


app.listen(3000, () => {
	console.log('Server has been started!');
});
