var express   = require('express');
var app       = express();
var server    = require('http').createServer(app);
var io        = require('socket.io')(server);

var Pomodoro  = require('./models/pomodoro');


var pomodoro = null;

io.on('connection', function(client) {
    console.log("client connected");
    client.emit('message', 'Connected');
});

io.on('start_pomodoro', function(client) {
    var date_now = new Date();
    if ( !pomodoro || !pomodoro.running( now ) ) {
        pomodoro = new Pomodoro(client.tags, client.description);
        client.emit('messages', {
            code: 200, 
            message: 'Pomodoro created', 
            pomodoro: pomodoro
        });
    } else {
        client.emit('messages', {
            code:403,
            message: 'There is an active pomodoro already',
            pomodoro: pomodoro
        })
    }
});

io.on('stop_pomodoro', function(client) {
    if (!pomodoro) {
        client.emit('messages', {
            code:403,
            message: 'There is no active pomodoro to be stoped',
        });
    }
    else {
        pomodoro.stop();
        client.emit('messages', {
            code: 200,
            message: 'Pomododo stoped'
        });
    }
});

app.get('/pomodoro/status', function(req, res) {
    if (!pomodoro) {
        res.status(403).json("False");
    } else {
        res.status(200).json(pomodoro);
    }
});

app.post('/pomodoro/create', function(req, res) {
    if (!pomodoro) {
        pomodoro = new Pomodoro(req.params.tags, req.params.description);
        res.status(200).json({code:200, message: 'Pomodoro created'})
    } else {
        res.status(403).json({message: 'The is an active pomodoro'})
    }
});

app.get('/pomodoro/stop', function(req, res) {
    if (!pomodoro) {
        res.status(403).json({message: 'There is no active pomodoro'})
    } else {
        pomodoro.stop();
        res.status(200).json({message: 'Pomodoro stoped'})
    }
})

app.listen(3000, function() {
    console.log("Server running on port 3000");
})
