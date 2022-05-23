/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const express = require('express');

const app = express();
const path = require('path');
const scanDirs = require('./src/utils/CargaRutas');

app.use(express.static('./public'));

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use('/', express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
scanDirs('./src/routes/').forEach((p) => app.use(require(p.path)));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('My first app listening on port 3000! '));

