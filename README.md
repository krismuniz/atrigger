# atrigger

[![Build Status](https://travis-ci.org/krismuniz/atrigger-node.svg?branch=master)](https://travis-ci.org/krismuniz/atrigger-node)

A very simple [A Trigger](http://atrigger.com) JavaScript library that helps you schedule and manage tasks using *A Trigger's* API.

#### What is *A Trigger*?

[A Trigger](http://atrigger.com) is a tool/service that helps you schedule periodic and fixed-time tasks by sending a GET request to a given url. It is a very simple and considerably flexible alternative to using [Cron](https://en.wikipedia.org/wiki/Cron) for job scheduling.

I use it a lot, so I wrote this simple abstraction to make my life easier and hopefully yours too.

## Features

This module helps you create, delete, pause, and resume tasks with ease and without worrying about URI Encoding, enormous URIs, GET requests, or anything other than your actual work. Also, with this module you can check if an IP address belongs to an atrigger.com server so you can verify the authenticity of a task call.

This is basically a simple abstraction of the [A Trigger Rest API](http://atrigger.com/docs/wiki/5/rest-api-v10). The main purpose of this mini-project was to create and publish my first NPM module as I learn more and more about Node.js and JavaScript. But I didn't want to do something useless, so I built this. :smiley:

## Usage Example

`atrigger` is very simple to use:

```javascript
// Require the atrigger module
var ATrigger = require('atrigger');

// Create a new ATrigger client instance with your API Key and Secret
var tasks = new ATrigger({
  APIKey: 'API_KEY',
  APISecret: 'API_SECRET'
});

// Create a new task
tasks.create({
  url: 'http://www.krismuniz.com/',
  timeSlice: '10min',
  count: 10,
  tags: {
    'title': 'call-my-site',
    'id': 'OtftvvsJ'
  }
});
```

You can handle request errors and API responses, too.

```javascript
tasks.create({
  url: 'http://www.krismuniz.com/',
  timeSlice: '10min',
  count: 10,
}, function(err, res) {
  if (err) {
    // Handle error
  } else {
    // Do stuff with APIs response
  }
});
```

## Installation

Installing the ```atrigger``` module is as simple as installing any other npm module:

```shell
$ npm install atrigger
```

## API Reference

#### `create` method

Creates a new task given a specific set of parameters. The callback function is optional.

```javascript
tasks.create({
  // parameters
}, callback(err, res));
```

##### Required Parameters:

* `url` (`[string]`): The target url that *A Trigger* will call at defined `timeSlice`. *Note: There is no need to use URIEncode(), the module does that for you.*

* `timeSlice` (`[string]`): The time frequency at which your task needs to be executed. (e.g. `'Xminute', 'Xhour', 'Xday', 'Xmonth', 'Xyear'` where `X` is a positive integer)

* `tags` (`[object]`): An object containing tags **(e.g. `{ tagname: tagvalue, tagname2: tagvalue2 }`)**. You need to tag your tasks for future identification and to control them using the API.

##### Optional Parameters:

* `retries` (`[integer]`): How many times *A Trigger* should try if your server failed (or was down)? Default value: `3`

* `count` (`[integer]`): How many cycles should be repeated? For an infinite amount of times write `-1`. Read more at [count parameter (Wiki)](http://atrigger.com/docs/wiki/8/rest-api-v10-parameter-count).

* `first` (`[string from date in ISO 8601 format]`): When should the first call be made? You are not required to set time value by default. Read more at [first parameter (Wiki)](http://atrigger.com/docs/wiki/10/rest-api-v10-parameter-first). Hint: use `.toISOString()` to convert a date to the proper format.

#### `delete` method

Deletes all tasks containing a specified set of tags. The callback function is optional.

```javascript
tasks.delete({
  // parameters
}, callback(err, res));
```

##### Required Parameters:

* `tags` (`[object]`): An object containing tags **(e.g. `{ tagname: tagvalue, tagname2: tagvalue2 }`)**. You need to tag your tasks for future identification and to control them using the API.

#### `pause` method

Pauses all currently-active tasks that contain a specified set of tags. The callback function is optional.

```javascript
tasks.pause({
  // parameters
}, callback(err, res));
```

##### Required Parameters:

* `tags` (`[object]`): An object containing tags **(e.g. `{ tagname: tagvalue, tagname2: tagvalue2 }`)**. You need to tag your tasks for future identification and to control them using the API.

#### `resume` method

Resumes all currently-paused tasks that contain a specified set of tags. The callback function is optional.

```javascript
tasks.resume({
  // parameters
}, callback(err, res));
```

##### Required Parameters:

* `tags` (`[object]`): An object containing tags **(e.g. `{ tagname: tagvalue, tagname2: tagvalue2 }`)**. You need to tag your tasks for future identification and to control them using the API.

#### `verifyRequest` method

Pass an IP address and the A Trigger API will respond if the call comes from an *A Trigger* server. The callback function is required (otherwise the method's existence would be pointless).

```javascript
tasks.verifyRequest({
  ip: '192.168.1.1'
}, callback(err, res));
```

##### Required Parameters:

* `ip` (`[string]`): The IP address you want to verify.

## Testing

Want to run some tests?

```shell
$ npm install
$ npm test
```

## License

[The MIT License (MIT)](http://opensource.org/licenses/MIT)

Copyright (c) 2015 Kristian Muñiz [http://krismuniz.com/]

## Disclaimer

I am not affiliated in any way to *A Trigger* and this library is not official. I just use this service and wanted to build this library for educational and productivity reasons.
