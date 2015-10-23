'use strict';

var expect = require('chai').expect;
var ATrigger = require('../index');

describe('ATrigger [object]', function() {
  it('contains a \'config\' property that also contains \'key\' and \'secret\'', function() {
    var result = new ATrigger({ APIKey: 'APIKey', APISecret: 'APISecret' });
    expect(result).to.be.a('object');
    expect(result.config).to.have.keys({
      'key': 'APIKey',
      'secret': 'APISecret'
    });
  });

  it('includes \'create\', \'delete\', \'resume\', and \'pause\' methods.', function() {
    var result = new ATrigger({ APIKey: 'APIKey', APISecret: 'APISecret' });
    expect(result.create).exist.and.to.be.a('function');
    expect(result.delete).exist.and.to.be.a('function');
    expect(result.resume).exist.and.to.be.a('function');
    expect(result.pause).exist.and.to.be.a('function');
  });

  describe('#_authData() [method]', function() {
    it('returns a url-encoded string concatenation of \'key\' and \'secret\' parameters', function() {
      var aT = new ATrigger({ APIKey: 'APIKey', APISecret: 'APISecret' }),
        result = aT._authData(),
        expected = 'key=APIKey&secret=APISecret';
      expect(result).to.exist.and.to.be.a('string');
      expect(result).to.equal(expected);
    });
  });

});

describe('#_processParameters() [private function]', function() {
  it('returns a url-encoded string concatenation of all the parameters', function() {
    var aT = new ATrigger({ APIKey: 'APIKey', APISecret: 'APISecret' });
    var result = aT._private.processParameters({
      url: 'http://www.krismuniz.com/',
      timeSlice: '10day',
      count: 10,
      tags: {
        'id': '12345678',
        'name': 'Bob Marley'
      }
    });
    var expected = '&url=http%3A%2F%2Fwww.krismuniz.com%2F&timeSlice=10day&count=10&tag_id=12345678&tag_name=Bob%20Marley';
    expect(result).exist.and.to.be.a('string');
    expect(result).to.equal(expected);
  });

  describe('when second argument is true:', function() {
    it('returns a url-encoded string concatenation of the tags only', function() {
      var aT = new ATrigger({ APIKey: 'APIKey', APISecret: 'APISecret' });
      var result = aT._private.processParameters({
        url: 'http://www.krismuniz.com/',
        timeSlice: '10day',
        count: 10,
        tags: {
          'id': '12345678',
          'name': 'Bob Marley'
        }
      }, true);
      var expected = '&tag_id=12345678&tag_name=Bob%20Marley';
      expect(result).exist.and.to.be.a('string');
      expect(result).to.equal(expected);
    });
  });
});
