var Pomodoro = require('../models/pomodoro');

module.exports = function(server) {
    var io = require('socket.io')(server);
    io.on('connection', function (client) {
        client.on('start_pomodoro', function() {
            if ( !global.pomodoro ) {
                global.pomodoro = new Pomodoro(client.tags, client.description);
                client.emit('messages', {
                    code: 200,
                    message: 'Pomodoro created',
                    pomodoro: global.pomodoro
                });
            } else {
                client.emit('messages', {
                    code:403,
                    message: 'There is an active pomodoro already',
                    pomodoro: global.pomodoro
                });
            }
        });

        client.on('status_pomodoro', function() {
            client.emit('messages', global.pomodoro);
        });

        client.on('stop_pomodoro', function() {
            if (!global.pomodoro) {
                client.emit('messages', {
                    code:403,
                    message: 'There is no active pomodoro to be stoped',
                });
            }
            else {
                global.pomodoro.stop();
                global.pomodoros.push(global.pomodoro);

                client.emit('messages', {
                    code: 200,
                    message: 'Pomododo stoped'
                });
                global.pomodoro = null;
            }
        });
    });
};
