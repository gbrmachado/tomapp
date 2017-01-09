var app          = require('express')();
var server       = require('http').Server(app);
var bodyParser   = require('body-parser');
var morgan       = require('morgan');
var passport     = require('passport');
var mongoose     = require('mongoose');
var config       = require('./config/database');   //Database Config File

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

//Passport
app.use(passport.initialize());
require('./config/passport')(passport);

//Mongoose Database
mongoose.connect(config.database);

//Pomodoro global object
global.pomodoro  = null;
global.pomodoros = [];

//SocketIO
require('./socket_io/socket')(server);

//Pomodoro Routes
var router    = require('./routes/routes_pomodoro')(app);
app.use('/', router);

//User's Routes
var users     = require('./routes/routes_users')(app);
app.use('/users', users);

//Initialize the Server
var pomodoro_app = server.listen(3000);
module.exports = pomodoro_app;
