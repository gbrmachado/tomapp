var chai   = require('chai'),
    expect = chai.expect;

var Pomodoro = require('../models/pomodoro');  //Pomodoro Class

var io = require('socket.io-client');          //socket.IO

var socketURL = 'http://0.0.0.0:5000';         //socketURL

var options ={
  transports: ['websocket'],
  'force new connection': true
};

describe('Test Socket Pomodoro', function() {
    var client = io.connect(socketURL, options);

    it('Test websocket connection', function() {
        client.on('messages', function(data) {
            expect(data.code).to.equal(200);
        });
    });
    it('Test if Pomodoro was created', function() {
        client.emit('start_pomodoro', function(msg) {
            console.log(msg);
        })
    });
});
