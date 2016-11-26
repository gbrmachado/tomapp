var request = require('supertest');

describe('Loading express', function () {
    var server;
    beforeEach(function () {
        server = require('../server');
    });
    afterEach(function () {
        server.close();
    });
    it('responds to /pomodoro/status', function testSlash(done) {
        request(server)
        .get('/pomodoro/status')
        .expect(403, done);
    });
    it('responds to non existent endpoints', function testPath(done) {
        request(server)
        .get('/foo/bar')
        .expect(404, done);
    });
    it('creates and stop a pomodoro', (done) => {
        var new_pomodoro = { tags: ["test", "test2"], description: "test" };

        request(server)
        .get('/pomodoro/status')
        .expect(403);

        request(server)
        .post('/pomodoro/create')
        .send(new_pomodoro)
        .expect(200)
        .expect('Content-Type', /json/);

        request(server)
        .get('/pomodoro/status')
        .expect(200);

        request(server)
        .post('/pomodoro/create')
        .send(new_pomodoro)
        .expect(403);

        request(server)
        .get('/pomodoro/stop')
        .expect(200);

        request(server)
        .get('/pomodoro/stop')
        .expect(403);

        request(server)
        .get('/pomodoro/status')
        .expect(403, done)
    })
});
