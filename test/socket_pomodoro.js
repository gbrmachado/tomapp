/* eslint no-console: 0     */  
/* eslint no-unused-vars: 0 */

var chai   = require('chai'),
    expect = chai.expect;

var io = require('socket.io-client');          //socket.IO

var socketURL = 'http://0.0.0.0:3000';         //socketURL

var options ={
    transports: ['websocket'],
    'force new connection': true
};

describe('Test Socket Pomodoro', function() {
    var client = io.connect(socketURL, options);
    beforeEach(function() {
        var server = require('../server');
    });
    it('Test websocket connection', function() {
        client.on('messages', function(data) {
            expect(data.code).to.equal(200);
        });
    });
    it('Test if Pomodoro was created', function() {
        client.emit('start_pomodoro', function(msg) {
            console.log(msg);
        });
    });
});
