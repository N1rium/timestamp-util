var assert = require('assert');
const { timestampFromDate, dateFromTimestamp } = require('../util');

describe('Timestamp', function() {
  describe('from date YYYY-MM-DD hh:mm:ss (2018-03-24 09:17:21)', function() {
    it('should return 1521879441000 as timestamp', function() {
      assert.equal(1521879441000, timestampFromDate('2018-03-24 09:17:21'));
    });
  });

  describe('To date and back', function() {
    it('should return same value when processed to date and back', function() {
      const d = new Date().getTime();
      assert.equal(
        dateFromTimestamp(d), 
        dateFromTimestamp(timestampFromDate(dateFromTimestamp(d)))
      );
    });
  });
});