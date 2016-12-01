var moment = require('moment');

module.exports = class Pomodoro {
    constructor(tags, description) {
        this._start_time    = new Date();
        this._end_time      = moment(this.start_time).add(25, 'minutes').toDate();
        this._tags          = tags;
        this._description   = description;
        this._interruptions = 0;
    }

    get end_time() {
        return this._end_time;
    }

    get start_time() {
        return this._start_time;
    }

    get tags() {
        return this._tags;
    }

    get interruptions() {
        return this._interruptions;
    }

    get description() {
        return this._description;
    }

    inc_interruption() {
        this._interruptions += 1;
    }

    set interruptions(value) {
        this._interruptions = value;
    }

    running(now) {  //If pomodoro is running at the moment
        var now_moment = moment(now);
        var start_time = moment(this.start_time);
        var end_time   = moment(this.end_time);
        return now_moment.isBetween(start_time, end_time);
    }

    stop() {
        this._end_time = new Date();
    }
};
