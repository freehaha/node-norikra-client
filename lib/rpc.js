var Client, MAX_MSGID, msgType, msgpack, unirest;

unirest = require('unirest');

msgpack = require('msgpack');

MAX_MSGID = 1024;

msgType = {
  REQUEST: 0,
  RESPONSE: 1,
  NOTIFY: 2
};

Client = (function() {
  function Client(host) {
    this.host = host;
    this.msgId = 0;
  }

  Client.prototype.incMsgId = function() {
    this.msgId += 1;
    if (this.msgId > MAX_MSGID) {
      return this.msgId = 0;
    }
  };

  Client.prototype.invoke = function(method, params, cb) {
    var msg;
    this.incMsgId();
    msg = msgpack.pack([msgType.REQUEST, this.msgId, method, params]);
    return unirest.post(this.host).encoding(null).headers({
      'Content-Type': 'application/x-msgpack'
    }).send(msg).end(function(resp) {
      var data;
      data = msgpack.unpack(resp.raw_body);
      if (data[0] !== msgType.RESPONSE) {
        cb(new Error("unknown type"));
        return;
      }
      if (data[2] !== null) {
        cb(new Error(data[2]));
        return;
      }
      if (cb && typeof cb === 'function') {
        return cb(null, data[3]);
      }
    });
  };

  return Client;

})();

exports.createClient = function(host, cb) {
  return new Client(host);
};
