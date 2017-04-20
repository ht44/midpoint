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
const setUser = require('./middleware/set_user');
const usersRouter = require('./routes/users')
const groupsRouter = require('./routes/groups');
const locationsRouter = require('./routes/locations');
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

// Custom middleware
app.use(setUser);

// Router middleware
app.use('/users', usersRouter);
app.use('/users/:user_id/groups', groupsRouter);
app.use('/groups', groupsRouter);
app.use('/midpoint', midpointRouter);
app.use('/auth', authRouter);
app.use('/locations', locationsRouter);

// Root
app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/midpoint');
  } else {
    res.render('auth/login', {
      message: 'PLEASE LOGIN'
    });
  }
});

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});

module.exports = app;
