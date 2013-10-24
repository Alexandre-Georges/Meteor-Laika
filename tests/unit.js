'use strict'

var assert = require('assert');

suite('Basics', function() {
    test('server init : OK', function(done, server) {
        server.eval(function() {
            var collection = CollectionA.find().fetch();
            emit('collection', collection);
        }).once('collection', function(collection) {
            assert.equal(collection.length, 0);
            done();
        });
    });
    test('client init : OK', function(done, server, client) {
        client.eval(function() {
            var collection = CollectionA.find().fetch();
            emit('collection', collection);
        }).once('collection', function(collection) {
            assert.equal(collection.length, 0);
            done();
        });
    });
    
    test('server insert : OK', function(done, server, client) {
        server.eval(function() {
            CollectionA.insert({colA: "a"  });
            var collection = CollectionA.find().fetch();
            emit('collection', collection);
        }).once('collection', function(collection) {
            assert.equal(collection.length, 1);
            done();
        });
        
        client.once('collection', function(collection) {
            assert.equal(CollectionA.find().fetch().length, 1);
            done();
        });
    });
    
    test('publish subscribe server : OK', function(done, server, client) {
        server.eval(function() {
            CollectionB.insert({ colA: "a" });
            CollectionB.insert({ colA: "b" });
            var collection = CollectionB.find().fetch();
            emit('collection', collection);
        });
        
        server.once('collection', function(collection) {
            assert.equal(collection.length, 2);
            done();
        });
    });
    
    test('publish subscribe client : OK', function(done, server, client) {
        server.eval(function() {
            CollectionB.insert({ colA: "a" });
            CollectionB.insert({ colA: "b" });
            var collection = CollectionB.find().fetch();
            emit('collection', collection);
        }).once('collection', function(collection) {
            done();
        });
        
        client.once('collection', function(collection) {
            var collection = CollectionB.find().fetch();
            assert.equal(collection.length, 1);
            done();
        });
    });
    
    test('method call', function(done, server, client) {
        
        client.eval(function() {
            Meteor.call('methodA', 1, function(error, resultServer) {
                emit('method', [ 1 * 2, resultServer ]);
            });
        });
        
        client.once('method', function(data) {
            assert.equal(data[0], data[1]);
            done();
        });
        
    });
});
