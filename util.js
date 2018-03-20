module.exports = {
  getCalculatedString: function(str) {
    return str
      .toLowerCase()
      .replace('now', new Date().getTime())
      .replace('ms',  '(1)')
      .replace('s',   '(1000)')
      .replace('m',   '(1000 * 60)')
      .replace('h',   '(1000 * 60 * 60)')
      .replace('d',   '(1000 * 60 * 60 * 24)');
  }
}