var Browserman = require('browserman-client');
var url = require('url');
var util = require('util');
var events = require('events');


util.inherits(Runner, events.EventEmitter);

function Runner(config) {
  this.config = config;
}

Runner.prototype.run = function () {
  var config = this.config;
  var browserman_urls = (config.browserman || "browserman.dp").split(":");
  var browser = config.browser && config.browser.split(",");

  var browserman = new Browserman({
    host: browserman_urls[0],
    port: browserman_urls[1]
  });


  this.emit("log", util.format("connect to %s", browserman.serverAddress));
  this.emit("log", util.format("testing", config.url));

  return browserman.test({
    requirement: {
      browser: browser
    },
    appName: config.app || "",
    url: config.url
  });
}


module.exports = Runner;