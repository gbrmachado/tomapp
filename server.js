var app          = require('express')();
var server       = require('http').Server(app);
global.pomodoro  = null;
global.pomodoros = [];

//SocketIO
var io = require('./socket_io/socket')(server);

//Express Routes
var router    = require('./routes/routes_pomodoro')(app);
app.use('/', router);

var pomodoro_app = server.listen(3000);
module.exports = pomodoro_app;
