'use strict';

require('locus');
require('dotenv').load();

const PORT = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const usersRouter = require('./routes/users')
const groupsRouter = require('./routes/groups');
const midpointRouter = require('./routes/midpoint');
const authRouter = require("./routes/auth");
const request = require('request');


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
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/midpoint', midpointRouter);
app.use('/auth', authRouter);

// LOGIN PAGE
app.get('/', (req, res) => {
  res.render('auth/login');
});

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});

module.exports = app;
