var chai   = require('chai'),
    expect = chai.expect;

var moment   = require('moment');
var Pomodoro = require('../models/pomodoro');

describe('Pomodoro Class', function() {
    var pomodoro = new Pomodoro(['test'], 'test');
    it('Test Initial Values', function() {
        expect(pomodoro.start_time).to.be.a('Date');
        expect(pomodoro.start_time.getDate()).to.be.a('number');
        expect(pomodoro.tags).to.be.instanceof(Array);
        expect(pomodoro.tags[0]).to.equal('test');
        expect(pomodoro.description).to.equal('test');
        expect(pomodoro.interruptions).to.equal(0);
    });
    it('Test increase interruptions', function() {
        pomodoro.inc_interruption();
        expect(pomodoro.interruptions).to.equal(1);
    });
    it('Test if date is within pomodoro interval', function() {
        var new_date = moment().add(10, 'minutes').toDate();
        expect(pomodoro.running(new_date)).to.equal(true);
        new_date = moment().add(20, 'minutes').toDate();
        expect(pomodoro.running(new_date)).to.equal(true);
        new_date = moment().add(30, 'minutes').toDate();
        expect(pomodoro.running(new_date)).to.not.equal(true);
        new_date = moment().subtract(2, 'minutes').toDate();
        expect(pomodoro.running(new_date)).to.not.equal(true);
        new_date = moment().subtract(1, 'minutes').toDate();
        expect(pomodoro.running(new_date)).to.not.equal(true);
    });
    it('test end_time', function() {
        pomodoro.stop();
        var new_date = moment().add(2, 'minutes').toDate();
        expect(pomodoro.running(new_date)).to.equal(false);
    });

});
