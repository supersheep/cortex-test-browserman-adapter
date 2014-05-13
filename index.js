var Browserman = require('browserman-client');
var url = require('url');
var util = require('util');
var events = require('events');

function BrowsermanAdapter(config){
    var self = this;
    var browserman_urls = (config.browserman || "browserman.dp").split(":");   
    var browser = config.browser && config.browser.split(",");

    this.path = config.path;

    this.browserman = new Browserman({
        host: browserman_urls[0],
        port: browserman_urls[1]
    });

    this.browser = browser;
    return this; 
}

util.inherits(BrowsermanAdapter,events.EventEmitter);

BrowsermanAdapter.prototype.test = function(){
    console.log(this.browser)
    this.emit("log", util.format("connect to %s", this.browserman.serverAddress));
    var test = this.browserman.test({
        requirement: {
            browser:this.browser
        },
        path: this.path
    });

    return test;
}

module.exports = function(config){
    return new BrowsermanAdapter(config);
}