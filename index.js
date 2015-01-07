var Norikra, rpc, util;

rpc = require('./lib/rpc');

util = require('util');

Norikra = (function() {
  function Norikra(host) {
    this.host = host;
    this.client = rpc.createClient(this.host);
  }

  Norikra.prototype.open = function(target, fields, autoField, cb) {
    var params;
    if (typeof fields === 'function') {
      cb = fields;
      fields = {};
    } else if (typeof autoField === 'function') {
      cb = autoField;
      autoField = false;
    }
    params = [target];
    if (fields) {
      params.push(fields);
    }
    if (autoField) {
      params.push(autoField);
    }
    this.client.invoke('open', [target, fields, autoField], cb);
  };

  Norikra.prototype.close = function(target, cb) {
    this.client.invoke('close', [target], cb);
  };

  Norikra.prototype.targets = function(cb) {
    if (!cb) {
      return;
    }
    this.client.invoke('targets', [], cb);
  };

  Norikra.prototype.register = function(name, query, group, cb) {
    if (typeof group === 'function') {
      cb = group;
      group = 'default';
    }
    this.client.invoke('register', [name, group, query], cb);
  };

  Norikra.prototype.deregister = function(name, cb) {
    this.client.invoke('deregister', [name], cb);
  };

  Norikra.prototype.queries = function(cb) {
    this.client.invoke('queries', [], cb);
  };

  Norikra.prototype.events = function(query, cb) {
    this.client.invoke('event', [query], cb);
  };

  Norikra.prototype.send = function(target, events, cb) {
    if (!util.isArray(events)) {
      events = [events];
    }
    this.client.invoke('send', [target, events], cb);
  };

  return Norikra;

})();

exports.Norikra = Norikra;

exports.createClient = function(host, port) {
  return new Norikra(host, port);
};
