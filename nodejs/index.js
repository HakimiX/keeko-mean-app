const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const { mongoose } = require('./db.js');
var customerController = require('./controllers/customerController');
var userController = require('./controllers/userController');


var app = express();

app.use(bodyParser.json());
app.use(cors());

// middleware passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/customers', customerController);
app.use('/users', userController);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () => console.log('Server started at port : 3000'));




