rpc = require('./lib/rpc')
util = require 'util'

class Norikra
  constructor: (@host)->
    @client = rpc.createClient(@host)
  open: (target, fields, autoField, cb)->
    if typeof fields is 'function'
      cb = fields
      fields = {}
    else if typeof autoField is 'function'
      cb = autoField
      autoField = false
    
    params = [target]
    params.push fields if fields
    params.push autoField if autoField
    @client.invoke 'open', [
      target
      fields
      autoField
    ], cb
    return
  close: (target, cb)->
    @client.invoke 'close', [
      target
    ], cb
    return
  targets: (cb)->
    return unless cb
    @client.invoke 'targets', [], cb
    return
  register: (name, query, group, cb)->
    if typeof group is 'function'
      cb = group
      group = null
    @client.invoke 'register', [
      name
      group
      query
    ], cb
    return
  deregister: (name, cb)->
    @client.invoke 'deregister', [
      name
    ], cb
    return
  queries: (cb)->
    @client.invoke 'queries', [], cb
    return
  events: (query, cb)->
    @client.invoke 'event', [
      query
    ], cb
    return
  send: (target, events, cb)->
    if not util.isArray events
      events = [events]
    @client.invoke 'send', [
      target
      events
    ], cb
    return

exports.Norikra = Norikra
exports.createClient = (host, port)->
  return new Norikra(host, port)
