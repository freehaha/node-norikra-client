# Norikra client for node.js

basic usage:
```js
var norikra = require('norikra-client');

c = norikra.createClient('http://localhost:26571')
// get a list of targets
c.targets(function (err, targets){
  console.log(targets);
})
```

# Supported methods

## open

```js
c.open(target, fields, autoField, [callback])
```
target | target name to open
fields | an object describing the fields with keys being the field name and values being the type
autoField | boolean

## close

```js
c.close(target, [callback])
```

`target` is the name of target stream to close

## targets

```js
c.targets([callback])
```
returns a list of opened targets

## register

```js
c.register(name, query, [group], [callback])
```
register a query. default group is 'default' if not specified.

## deregister

```js
c.deregister(name, [callback])
```
deregister a query

## queries

```js
c.queries([callback])
```
get a list of registered queries

## events

```js
c.events(query_name, [callback])
```
get an array of events captured by the query and sweep

## send

```js
c.send(target, events, [callback])
```
send an array of events to `target`
