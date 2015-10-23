'use strict';
var request = require('request');

function processParameters(parameters, tagsOnly) {
  var parameterString = '';
  if (!tagsOnly) {
    for (var param in parameters) {
      if (parameters.hasOwnProperty(param) && param != 'tags') {
        parameterString += '&' + param + '=' + encodeURIComponent(parameters[param]);
      }
    }
  }

  if (parameters['tags']) {
    for (var tagName in parameters['tags']) {
      if (parameters['tags'].hasOwnProperty(tagName)) {
        parameterString += '&tag_' + tagName + '=' + encodeURIComponent(parameters['tags'][tagName]);
      }
    }
  }

  return parameterString;
}

function getRequest(endpoint, urlParameters, callback) {
  var urlString = 'http://api.atrigger.com/v1/';
  urlString += endpoint + '?' + urlParameters;
  return request(urlString, function(error, respose, body) {
    callback(JSON.parse(error), JSON.parse(body));
  });
}

var ATriggerClient = function(APIKey, APISecret) {
  this.config = {
    key: APIKey,
    secret: APISecret
  }
}

ATriggerClient.prototype._authData = function() {
  return 'key=' + encodeURIComponent(this.config.key) + '&secret=' + encodeURIComponent(this.config.secret);
}

ATriggerClient.prototype.create = function(params, callback) {
  return getRequest('tasks/create', this._authData() + processParameters(params), callback);
};

ATriggerClient.prototype.delete = function(params, callback) {
  return getRequest('tasks/delete', this._authData() + processParameters(params, true), callback);
}

ATriggerClient.prototype.pause = function(params, callback) {
  return getRequest('tasks/pause', this._authData() + processParameters(params, true), callback);
}

ATriggerClient.prototype.resume = function(params, callback) {
  return getRequest('tasks/resume', this._authData() + processParameters(params, true), callback);
}

ATriggerClient.prototype.verifyRequest = function(params, callback) {
  return getRequest('ipverify', this._authData() + processParameters(params), callback);
}

if (process.env.NODE_ENV === 'test') { // Expose private functions when testing
  ATriggerClient.prototype._private = {
    processParameters: processParameters,
    getRequest: getRequest
  };
}

module.exports = function(args) {
  if (!args || !args.APIKey || !args.APISecret) {
    throw new Error('ATrigger APIKey and APIKey parameters are required.');
  }
  return new ATriggerClient(args.APIKey, args.APISecret);
};
