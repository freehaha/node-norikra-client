unirest = require 'unirest'
msgpack = require 'msgpack'
streamBuffers = require('stream-buffers')

MAX_MSGID = 1024

msgType = {
  REQUEST: 0
  RESPONSE: 1
  NOTIFY: 2
}

class Client
  constructor: (@host)->
    @msgId = 0
    #
  incMsgId: ->
    @msgId += 1
    if @msgId > MAX_MSGID
      @msgId = 0

  invoke: (method, params, cb)->
    @incMsgId()
    msg = msgpack.pack [
      msgType.REQUEST
      @msgId
      method
      params
    ]
    unirest.post(@host)
      .encoding(null)
      .headers({
        'Content-Type': 'application/x-msgpack'
      })
      .send(msg)
      .end (resp)->
        data = msgpack.unpack(resp.raw_body)
        if data[0] != msgType.RESPONSE
          cb(new Error("unknown type"))
          return
        if data[2] != null
          cb(new Error(data[2]))
          return
        if cb and typeof cb is 'function'
          cb(null, data[3])
    
exports.createClient = (host, cb)->
  return new Client(host)
