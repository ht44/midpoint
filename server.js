'use strict';

// const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieSession = require('cookie-session');
const PORT = process.env.PORT || 3000;
const app = express();
require('locus');
app.set('view engine', 'ejs');


// Config middleware
// app.use(cookieParser('weesnaw'));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieSession({
  keys: ['KEY1', 'KEY2', 'KEY3']
}))

// Routers

app.get('/', (req, res) => {
  res.send('good to go');
});

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});

module.exports = app;
