# atrigger
A very simple [A Trigger](atrigger.com) API module implementation for Node.js

[A Trigger](atrigger.com) is a task scheduling tool that can be used to do synchronous/periodic app tasks. It is a very simple and flexible alternative to using [Cron](https://en.wikipedia.org/wiki/Cron). I use it a lot, so I wrote this simple abstraction to make my life easier and hopefully yours too.

## Features

This module helps you create, delete, pause, and resume tasks with ease and without worrying about URI Encoding, enormous URIs, GET requests, or anything other than your actual work. Also, with this module you can check if an IP address belongs to an atrigger.com server so you can verify the authenticity of a task call.

This is basically a simple abstraction of the [A Trigger Rest API](http://atrigger.com/docs/wiki/5/rest-api-v10). The main purpose of this mini-project was to create and publish my first NPM module as I learn more and more about Node.js and JavaScript. But I didn't want to do something useless, so I built this. :smiley:

## Usage Example

`atrigger` is very simple to use:

```javascript
// Require the atrigger module
var ATrigger = require('atrigger')

// Create a new ATrigger client instance with your API Key and Secret
var tasks = new ATrigger({
  APIKey: 'API_KEY',
  APISecret: 'API_SECRET'
})

// Create a new task
tasks.create({
  url: 'http://www.krismuniz.com/',
  timeSlice: '10min',
  count: 10,
  tags: {
    'title': 'call-my-site',
    'id': 'OtftvvsJ'
  }
})
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
})

```

## Installation

Installing the ```atrigger``` module is as simple as installing any other npm module:

```shell
$ npm install atrigger -S
```

## API Reference

#### `create` method

Creates a new task given a specific set of parameters.

```javascript

tasks.create({
  // parameters
}, callback(err, res))

```

##### Required Parameters:

* `url` (*required*): [ `'http://www.example.com'` ] The target url that A Trigger will call it at defined TimeSlice. *Note: There is no need to use URIEncode()*

* `timeSlice` (*required*): [ `'Xminute'` | `'Xhour'` | `'Xday'` | `'Xmonth'` | `'Xyear'` ] The time frequency at which your task needs to be executed.

* `tags` (*required*): [ `object` ] An object containing tags (e.g. `{ tagname: tagvalue, tagname2: tagvalue2 }`). You need to tag your tasks for future identification and to control them using the API in the future.

##### Optional Parameters:

* `retries` (*optional*): [ `Number` ] How many times should try if your server failed(or it was down)? Default value: 3

* `count` (*optional*): [ `Number` ] How many cycles should be repeated? Read more at [count parameter](http://atrigger.com/docs/wiki/8/rest-api-v10-parameter-count).

* `first` (*optional*): When should be the first call? You are not required to set time value by default. Read more at [first parameter](http://atrigger.com/docs/wiki/10/rest-api-v10-parameter-first).

#### `delete` method

All tasks containing a specified set of tags will be deleted.

```javascript

tasks.delete({
  // parameters
}, callback(err, res))

```

##### Required Parameters:

* `tags` (*required*): [ `object` ] An object containing tags (e.g. `{ tagname: tagvalue, tagname2: tagvalue2 }`).

#### `pause` method

All currently running tasks containing a specified set of tags will be paused.

```javascript

tasks.pause({
  // parameters
}, callback(err, res))

```

##### Required Parameters:

* `tags` (*required*): [ `object` ] An object containing tags (e.g. `{ tagname: tagvalue, tagname2: tagvalue2 }`).

#### `resume` method

All currently paused tasks containing a specified set of tags will be resumed.

```javascript

tasks.resume({
  // parameters
}, callback(err, res))

```

##### Required Parameters:

* `tags` (*required*): [ `object` ] An object containing tags (e.g. `{ tagname: tagvalue, tagname2: tagvalue2 }`).

## Testing

Want to run some tests?

```shell
$ npm test
```

## License

The MIT License (MIT)

Copyright (c) 2015 Kristian Muñiz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
