var chai = require("chai");
var express = require("express");
var adapter = require("../");
var path = require("path");
var socket = require("socket.io");
var http = require("http");
var socketclient = require('socket.io-client');


var expect = chai.expect;
chai.should();


describe("runners",function(){

    describe("#browserman()",function(){
        var test;
        before(function(){

            var server = require('http').createServer();
            server.listen(3071);

            require('socket.io')
                .listen(server)
                .of('/client')
                .on('connection', function(socket){
                    socket.emit("done","test");
                });

            test = adapter({
                path: path.join(__dirname,"expect","built.html"),
                cwd: path.join(__dirname,"suite"),
                browserman: "127.0.0.1:3071"
            });
        });


        it("should emit done",function(done){
            test.test().on("done",function(result){
                expect(result).to.equal("test");
                done()
            });
        });
    });

});