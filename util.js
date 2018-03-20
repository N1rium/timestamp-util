const moment = require('moment');
const math = require('mathjs');

  getCalculatedString = (str) =>
    str.toLowerCase()
      .replace('now', new Date().getTime())
      .replace('ms',  '(1)')
      .replace('s',   '(1000)')
      .replace('m',   '(1000 * 60)')
      .replace('h',   '(1000 * 60 * 60)')
      .replace('d',   '(1000 * 60 * 60 * 24)');


module.exports = {
  timestampFromDate: (dateStr) => new Date(moment(dateStr)).getTime(),

  dateFromTimestamp: (timestamp, format = 'YYYY-MM-DD HH:mm:ss') => moment(Number(timestamp)).format(format),

  evaulatedDateObj: (input, format = 'YYYY-MM-DD HH:mm:ss') => {
    const str = getCalculatedString(input);
    const evaluated = math.eval(str);
    return {
      timestamp: evaluated,
      date: moment(Number(evaluated)).format(format)
    }
  }
}