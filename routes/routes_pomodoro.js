var express = require('express');
var router = express.Router();
var Pomodoro = require('../models/pomodoro');

module.exports = function() {
    router.get('/pomodoro/status', function(req, res) {
        if (!global.pomodoro) {
            res.status(403).json('False');
        } else {
            res.status(200).json(global.pomodoro);
        }
    });

    router.get('/pomodoro/interrupt', function(req, res) {
        if (!global.pomodoro) {
            res.status(403).json('There is no active pomodoro');
        } else {
            global.pomodoro.inc_interruption();
            res.status(200).json('Interruption Increased');
        }
    });

    router.post('/pomodoro/create', function(req, res) {
        if (!global.pomodoro) {
            global.pomodoro = new Pomodoro(req.params.tags, req.params.description);
            res.status(200).json({code:200, message: 'Pomodoro created'});
        } else {
            res.status(403).json({message: 'There is an active pomodoro'});
        }
    });

    router.get('/pomodoro/stop', function(req, res) {
        if (!global.pomodoro) {
            res.status(403).json({message: 'There is no active pomodoro'});
        } else {
            global.pomodoro.stop();
            global.pomodoros.push(global.pomodoro);
            global.pomodoro = null;
            res.status(200).json({message: 'Pomodoro stoped'});
        }
    });

    return router;
};
