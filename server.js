'use strict';

require('locus');
require('dotenv').load();

const PORT = process.env.PORT || 3000;

const midpoint = require('./public/math');
// const mpTest = midpoint.getMidpoint(midpoint.test);
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const groupsRouter = require('./routes/groups');
const request = require('request');
const gClient = require('@google/maps').createClient({
  key: process.env.API_KEY
})

const app = express();

const secrets = [
  process.env.KEY_1,
  process.env.KEY_2,
  process.env.KEY_3
]

app.set('view engine', 'ejs');

// Config middleware
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser(secrets));
app.use(cookieSession({
  keys: secrets
}));

// Router middleware
app.use('/groups', groupsRouter);

app.get('/', (req, res) => {
  res.render('statics/home', {apiKey: process.env.API_KEY});
});

// app.get('/hayden', (req, res) => {

  // request(
  //   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.API_KEY}&location=${mpTest.lat},${mpTest.lng}&radius=10000`,
  //   (err, response, body) => {
  //     // console.log('error:', err);
  //     // console.log('statusCode:', response && response.statusCode);
  //     res.send(body);
  //   });
//   res.render('statics/hayden', {apiKey: process.env.API_KEY});
// });

// app.use('/users', usersRouter)

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});

module.exports = app;
