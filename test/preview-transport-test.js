'use strict';

var chai = require('chai');
var expect = chai.expect;
var previewTransport = require('../src/preview-transport');
chai.Assertion.includeStack = true;
var crypto = require('crypto');
var fs = require('fs');

var randomBytes = crypto.randomBytes(20).toString('hex');

function MockBuilder(envelope, message) {
    this.envelope = envelope;
    this.message = new(require('stream').PassThrough)();
    this.message.end(message);
}

MockBuilder.prototype.getEnvelope = function() {
    return this.envelope;
};

MockBuilder.prototype.createReadStream = function() {
    return this.message;
};

MockBuilder.prototype.getHeader = function() {
    return randomBytes;
};

describe('Preview Transport Tests', function() {
    it('Should expose version number', function() {
        var client = previewTransport();
        expect(client.name).to.exist;
        expect(client.version).to.exist;
    });

    it('Should send message', function(done) {
        var client = previewTransport();

        client.send({
            data: {},
            message: new MockBuilder({
                from: 'test@valid.sender',
                to: 'test@valid.recipient'
            }, 'message')
        }, function(err, data) {
            expect(err).to.not.exist;
            expect(data.messageId).to.equal(randomBytes);
            expect(data.path).to.contain(randomBytes + '.html');

            fs.unlink(data.path, done);
        });
    });

    it('Should return an error', function(done) {
        var client = previewTransport({
            // use a made up directory that most probably does not exist
            directory: '/MqauOobH6mgKoL/6pRiNkj7hTEtIA/9YhF9hY115v4I/hqR730EKY7I96G/PILrwPJ45NeCNo'
        });

        client.send({
            data: {},
            message: new MockBuilder({
                from: 'test@valid.sender',
                to: 'test@valid.recipient'
            }, 'message')
        }, function(err, data) {
            expect(err).to.exist;
            expect(data).to.not.exist;

            done();
        });
    });
});
