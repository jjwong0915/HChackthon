'use strict';

let path = require('path');
let express = require('express');
let cons = require('consolidate');

let app = express();

app.set('views', path.join(__dirname, '../client/template'));
app.set('view engine', 'html');
app.engine('html', cons.hogan);
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', (req, res) => {
	res.render('index', {title: 'HC hackthon'});
});

app.listen(3000, () => {
	console.log('Server has been started!');
});
